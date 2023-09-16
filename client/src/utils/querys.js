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
query GetUserDecks {
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
