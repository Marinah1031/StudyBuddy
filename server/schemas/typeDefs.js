const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    decks: [Deck]
  }

  type Deck {
    _id: ID
    deckName: String!
    description: String
    cards: [Card]
  }

  type Card {
    _id: ID
    term: String!
    definition: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    allDecks: [Deck]
    viewCard(_id: ID!): Card
    allUsers: [User]
    allCards: [Card]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createDeck(title: String!): User
    createCard(term: String!, def: String!): Deck
    removeDeck(_id: ID!): User
    removeCard(_id: ID!): Deck
  }
`;

module.exports = typeDefs;
