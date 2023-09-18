import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styles from './CardPage.module.css';
import Deck from '../components/main';
import { GET_USER_DECKS } from '../utils/querys';
import { CREATE_DECK, REMOVE_DECK } from '../utils/mutations'; // Import the REMOVE_DECK mutation

const UserPage = () => {
  const navigate = useNavigate();

  const { loading, data, refetch } = useQuery(GET_USER_DECKS);
  const [createDeck] = useMutation(CREATE_DECK);
  const [removeDeck] = useMutation(REMOVE_DECK); // Import the REMOVE_DECK mutation

  const userDecks = data?.getUserDecks || [];

  if (loading) return <p>Loading...</p>;

  const newDeck = async () => {
    try {
      await createDeck({
        variables: {
          deckName: 'example2',
          description: 'thing5',
        },
      }).then((response) => {
        const newPath = response.data.createDeck._id;
        navigate(`../saved/${newPath}/edit`, { relative: 'path' });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveDeck = async (deckId) => {
    try {
      await removeDeck({
        variables: {
          deckId,
        },
      });
      // After removing a deck, refetch the user decks to update the UI
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles['card-page']}>
      <h1>Your Decks</h1>
      <div className={styles['card-nav']}>
        {userDecks.map((deck, index) => (
          <div key={index} className={styles['deck-container']}>
            <Deck
              deckName={deck.deckName}
              description={deck.description}
              createdBy={deck.createdBy}
              deckId={deck._id}
            />
            <button
              className={styles['remove-deck']}
              onClick={() => handleRemoveDeck(deck._id)}
            >
              Remove Deck
            </button>
          </div>
        ))}
      </div>
      <button className={styles['createdeck']} id='createDeck' onClick={newDeck}>
              New Deck
      </button>
    </section>
  );
};

export default UserPage;
