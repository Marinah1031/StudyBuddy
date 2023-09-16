import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_ALL_DECKS } from '../utils/querys';
import { useParams } from 'react-router-dom';
import styles from './CardPage.module.css';
import Deck from '../components/main';


const MainPage = () => {

  const { loading, data } = useQuery(FIND_ALL_DECKS);

  const decks = data?.allDecks || [];

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles['card-page']}>
      <div className={styles['card-nav']}>
      </div>
      {decks.map((decks) => (
                <Deck deckName={decks.deckName} description={decks.description} createdBy={decks.createdBy} deckId={decks._id} />
            ))}
    </section>
  );
};

export default MainPage;
