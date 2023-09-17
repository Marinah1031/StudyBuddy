import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styles from './CardPage.module.css';
import Deck from '../components/main';
import { GET_USER_DECKS } from '../utils/querys';
import { CREATE_DECK } from '../utils/mutations';

const UserPage = () => {
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USER_DECKS);
  const [createDeck] = useMutation(CREATE_DECK);

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
        navigate(`../saved/${newPath}/edit`, { relative: 'path'});
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={styles['card-page']}>
      <button id='createDeck' onClick={newDeck}>NewDeck</button>
      <h1>Your Decks</h1>
      <h1>{}</h1>
      <div className={styles['card-nav']}>
      </div>
      {userDecks.map((decks, index) => (
                <Deck
                key={index}
                deckName={decks.deckName} 
                description={decks.description} 
                createdBy={decks.createdBy} 
                deckId={decks._id} />
            ))}
    </section>
  );
};

export default UserPage;
