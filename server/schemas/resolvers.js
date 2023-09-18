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

const ownership = new AuthenticationError("You don't own this Deck!");

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

    getUser: async (parent, { userID}) => User.findOne({ _id: userID }),
    viewDeck: async (parent, { deckID }) => Deck.findOne({ _id: deckID }),
    viewUserDecks: async (parent, { userID }) => Deck.find({ createdBy: userID }),
    getUserDecks: async (parent, args, context) => {
      if (context.user) {
        const uerDecks = await Deck.find({ createdBy: context.user._id });

        return uerDecks;
      }

      throw needLogin;
    },

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
      if (context.user) {
        const userID = context.user._id;
        const newDeck = await Deck.create({deckName, description, createdBy: userID});

        return newDeck;
      }
      throw new AuthenticationError("context.user._id");
    },
    removeDeck: async (parent, { deckId }, context) => {
      const deck = await Deck.findOne({ _id: deckId });
    
      if (!deck) {
        // Handle case where deck with the given deckId does not exist
        throw new Error('Deck not found');
      }
    
      if (deck.createdBy.toString() !== context.user._id) {
        // If the deck's createdBy doesn't match the user's id, throw an error
        throw new Error(ownership);
      }
    
      // If the createdBy id matches the user's id, proceed with deletion
      const deletedDeck = await Deck.findOneAndDelete({
        _id: deckId,
      });
    
      return deletedDeck;
    },

    addCard: async (parent, {deckId, term, definition}) => {
      const deck = await Deck.findOneAndUpdate(
        {_id: deckId},
        {$addToSet: {cards: { term, definition }}}, 
        {
          new: true,
          runValidators: true,
        })
        return deck;
    },

    removeCard: async (parent, { deckId, cardId }, context) => {
      const deck = await Deck.findOne({ _id: deckId });

      // Handle case where deck with the given deckId does not exist
      if (!deck) {
        throw new Error('Deck not found');
      }

      // If the deck's createdBy doesn't match the user's id, throw an error
      // if (deck.createdBy.toString() !== context.user._id) {
      //   throw new Error(ownership);
      // }

      // Remove the card from the deck
      const updatedDeck = await Deck.findOneAndUpdate(
        { _id: deckId },
        { $pull: { cards: { _id: cardId } } },
        { new: true }
      );

      // Handle case where Card is not found in the deck
      if (updatedDeck.cards.length === deck.cards.length) {
        throw new Error('Card not found in the deck');
      }

      return updatedDeck;
    },

    editDeck: async (parent, { deckId, updatedDeckName, updatedDescription }, context) => {
      const deck = await Deck.findOne({ _id: deckId });

      // Handle case where deck with the given deckId does not exist
      if (!deck) {
        throw new Error('Deck not found');
      }

      // If the deck's createdBy doesn't match the user's id, throw an error
      // if (deck.createdBy.toString() !== context.user._id) {
      //   throw new Error(ownership);
      // }

      // Edit Deck Name and Description
      const updatedDeckInfo = await Deck.findOneAndUpdate(
        { _id: deckId },
        {
          $set: {
            deckName: updatedDeckName,
            description: updatedDescription,
          },
        },
        { new: true }
      );

      // Handle case where Card is not found in the deck
      if (updatedDeck.cards === deck.cards) {
        throw new Error('Card not found in the deck');
      }

      return updatedDeckInfo;
    },

    editCard: async (parent, { deckId, cardId, updatedTerm, updatedDefinition }, context) => {
      const deck = await Deck.findOne({ _id: deckId });

      // Handle case where deck with the given deckId does not exist
      if (!deck) {
        throw new Error('Deck not found');
      }

      // If the deck's createdBy doesn't match the user's id, throw an error
      if (deck.createdBy.toString() !== context.user._id) {
        throw new Error(ownership);
      }

      // Remove the card from the deck
      const updatedDeck = await Deck.findOneAndUpdate(
        { _id: deckId, 'cards._id': cardId },
        {
          $set: {
            'cards.$.term': updatedTerm,
            'cards.$.definition': updatedDefinition,
          },
        },
        { new: true }
      );

      // Handle case where Card is not found in the deck
      if (updatedDeck.cards === deck.cards) {
        throw new Error('Card not found in the deck');
      }

      return updatedDeck;
    }
  },
};

module.exports = resolvers;
