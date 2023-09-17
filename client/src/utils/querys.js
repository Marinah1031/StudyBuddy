import { gql } from '@apollo/client';

export const FIND_ALL_DECKS = gql`
query AllDecks {
  allDecks {
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
}`
;

export const FIND_SINGLE_DECK = gql`
query ViewDeck($deckId: ID!) {
  viewDeck(deckID: $deckId) {
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
}`
;

export const GET_USER_DECKS = gql`
{
  getUserDecks {
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
}`
;


export const FIND_ALL_USERS = gql`
query AllUsers {
  allUsers {
    _id
    username
  }
}`
;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
  }
}
`;

export const VIEW_USER_DECKS = gql`
query ViewUserDecks($userId: ID!) {
  viewUserDecks(userID: $userId) {
    _id
    deckName
    description
  }
}
`;

export const GET_ONE_USER = gql`
query GetUser($userId: ID!) {
  getUser(userID: $userId) {
    username
  }
}`;