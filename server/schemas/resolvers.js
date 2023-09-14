const { User, Deck, Card } = require("../models");

//Note: uncomment once Auth is created.
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const loginError = new AuthenticationError(
  "Email and Password pair does not match database."
);

const loginError1 = new AuthenticationError("Email problem.");

const loginError2 = new AuthenticationError("PW problem.");

const needLogin = new AuthenticationError("You need to be logged in!");

const ownershp = new AuthenticationError("You don't own this!");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw needLogin;
    },

    allDecks: async () => Deck.find(),
    allUsers: async () => User.find(),
    allCards: async () => Card.find(),

    viewDeck: async (parent, { deckID }) => Deck.findOne({ _id: deckID }),
    viewCard: async (parent, { cardID }) => Card.findOne({ _id: cardID }),

    viewUserDecks: async (parent, { userID }) => Deck.find({ createdBy: userID }),
    viewDeckCards: async (parent, { deckID }) => Card.find({ inDeck: deckID }),
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw loginError1;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw loginError2;
      }

      const token = signToken(user);
      return { token, user };
    },
    createDeck: async (parent, {deckName, description}, context) => {
      // console.log(context.user);
      if (context.user) {
        const userID = context.user._id;
        console.log(userID);
        const newDeck = await Deck.create({deckName, description, createdBy: userID});

        // console.log(newDeck)
        return newDeck;
      }
      throw new AuthenticationError("context.user._id");
    },
    removeDeck: async (parent, { deckId }, context) => {
      // if (context.user.id != Deck.findOne({ _id: deckID })) {
        // console.log(deckId);
        const deck = await Deck.findOneAndDelete({
          _id: deckId,
        });

        return deck;
      // }
      // throw ownershp;
    },
    createCard: async (parent, { term, definition, inDeck }, context) => {
      if (context.user) {
        const newCard = await Card.create({ term, definition, inDeck });

        return newCard;
      }
      throw needLogin;
    },

    addCard: async (parent, {deckId, term, definition}) => {
      const deck = await Deck.findOneAndUpdate({ _id: deckId},
        {$addToSet: {cards: { term, definition }}}, {
          new: true,
          runValidators: true,
        }
        )
        return deck;
    },

    removeCard: async (parent, { deckId, cardId }, context) => {
      if (context.user) {
        return Deck.findOneAndUpdate(
          { _id: deckId },
          { $pull: { cards: { _id: cardId } } },
          { new: true }
        );
      }
      throw needLogin;
    },
  },
};

module.exports = resolvers;
