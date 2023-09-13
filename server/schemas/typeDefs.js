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
  }

  type Card {
    _id: ID
    term: String
    definition: String
    inDeck: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    allDecks: [Deck]
    allUsers: [User]
    allCards: [Card]
    viewDeck(deckID: ID!): Deck
    viewCard(cardID: ID!): Card
    viewUserDecks(userID: ID!): [Deck]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createDeck(deckName: String!, description: String): Deck
    createCard(term: String!, definition: String!): Deck
    removeDeck(deckId: ID!): Deck
    removeCard(_id: ID!): Deck
  }
`;

module.exports = typeDefs;
