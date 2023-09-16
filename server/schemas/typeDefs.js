const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Deck {
    _id: ID
    deckName: String
    description: String
    createdBy: ID
    cards: [Card]
  }

  type Card {
    _id: ID
    term: String
    definition: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    allDecks: [Deck]
    allUsers: [User]
    viewDeck(deckID: ID!): Deck
    viewCard(cardID: ID!): Card
    viewUserDecks(userID: ID!): [Deck]
    viewDeckCards(deckID: ID!): [Deck]
    getUserDecks: [Deck]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createDeck(deckName: String!, description: String): Deck
    createCard(term: String!, definition: String!, inDeck: ID!): Card
    addCard(deckId: ID!, term: String, definition: String): Deck
    removeDeck(deckId: ID!): Deck
    removeCard(deckId: ID!, cardId: ID!): Deck
    editCard(deckId: ID!, cardId: ID!, updatedTerm: String!, updatedDefinition: String!): Deck
  }
`;

module.exports = typeDefs;
