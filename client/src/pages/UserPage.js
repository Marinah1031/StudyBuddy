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
        navigate(`../saved/${newPath}/edit`, { relative: 'path' });
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={styles['card-page']}>
      <h1>Your Decks</h1>
      <h1>{ }</h1>
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
      <div className='newdeckdiv'>
        <button className={styles['createdeck']} id='createDeck' onClick={newDeck}>New Deck</button>
      </div>
    </section>
  );
};

export default UserPage;
