import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_CARD = gql`
  mutation saveCard($cardData: CardInput!) {
    saveBook(cardData: $cardData) {
      _id
      username
      email
      savedCards {
        cardId
        description
        title
      }
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation RemoveCard($deckId: ID!, $cardId: ID!) {
    removeCard(deckId: $deckId, cardId: $cardId) {
      _id
      deckName
      description
      createdBy
      cards {
        _id
        term
        definition
      }
    }
  }
`;

export const EDIT_SINGLE_CARD = gql`
  mutation EditCard(
    $deckId: ID!
    $cardId: ID!
    $updatedTerm: String!
    $updatedDefinition: String!
  ) {
    editCard(
      deckId: $deckId
      cardId: $cardId
      updatedTerm: $updatedTerm
      updatedDefinition: $updatedDefinition
    ) {
      _id
      deckName
      description
      createdBy
      cards {
        _id
        term
        definition
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($deckId: ID!) {
    addCard(deckId: $deckId) {
      _id
      deckName
      description
      createdBy
      cards {
        _id
        term
        definition
      }
    }
  }
`;

export const EDIT_DECK = gql`
mutation EditDeck($deckId: ID!, $updatedDeckName: String!, $updatedDescription: String!) {
  editDeck(deckId: $deckId, updatedDeckName: $updatedDeckName, updatedDescription: $updatedDescription) {
    _id
    deckName
    description
    createdBy
  }
}`;

export const CREATE_DECK = gql`
mutation CreateDeck($deckName: String!, $description: String) {
  createDeck(deckName: $deckName, description: $description) {
    _id
    deckName
    description
    createdBy
  }
}`;

export const REMOVE_DECK = gql`
  mutation RemoveDeck($deckId: ID!) {
    removeDeck(deckId: $deckId) {
      _id
      deckName
      description
      createdBy
      cards {
        _id
        term
        definition
      }
    }
  }
`;





