import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { VIEW_USER_DECKS } from '../utils/querys';
import { useParams } from 'react-router-dom';
import styles from './CardPage.module.css';
import Deck from '../components/main';
import { QUERY_ME } from '../utils/querys';

const UserPage = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const { loading, data } = useQuery(FIND_ALL_DECKS);
//   const [removeBook, { error }] = useMutation(REMOVE_BOOK);

const user = data?.me;
const userDecks = user?.me || [];

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles['user-page']}>
        <h1>Your Decks</h1>
      <div className={styles['deck-list']}>
        {userDecks.map((decks) => (
            <Deck 
            key={decks._id} 
            deckName={decks.deckName} 
            description={decks.description} 
            createdBy={decks.createdBy} 
            deckId={decks._id} 
                />
                ))}
                </div>
    </section>
  );
};

export default UserPage;
