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