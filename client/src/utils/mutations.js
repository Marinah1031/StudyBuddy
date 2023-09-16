import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
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
  mutation removeCard($cardId: ID!) {
    removeCards(cardId: $cardId) {
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
