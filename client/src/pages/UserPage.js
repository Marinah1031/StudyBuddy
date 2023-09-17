import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { VIEW_USER_DECKS } from '../utils/querys';
import { useParams } from 'react-router-dom';
import styles from './CardPage.module.css';
import Deck from '../components/main';
import { GET_USER_DECKS  } from '../utils/querys';

const UserPage = () => {

  const { loading, data } = useQuery(GET_USER_DECKS);

//   const [removeBook, { error }] = useMutation(REMOVE_BOOK);

const userDecks = data?.getUserDecks || [];

  if (loading) return <p>Loading...</p>;

  return (

    <section className={styles['card-page']}>
        <h1>Your Decks</h1>
        <h1>{}</h1>
      <div className={styles['card-nav']}>
      </div>
      {userDecks.map((decks) => (
                <Deck 
                deckName={decks.deckName} 
                description={decks.description} 
                createdBy={decks.createdBy} 
                deckId={decks._id} />
            ))}
               
               
    </section>
  );
};

export default UserPage;
