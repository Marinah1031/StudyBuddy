import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_ALL_DECKS } from '../utils/querys';
import styles from './CardPage.module.css';
import Deck from '../components/main';

const MainPage = () => {
  // Fetch all decks data using useQuery
  const { loading, data } = useQuery(FIND_ALL_DECKS);

  // Extract the decks array from the fetched data, or initialize as an empty array
  const decks = data?.allDecks || [];

  // Render loading state while data is being fetched
  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles['card-page']}>
      <div className={styles['card-nav']}>
        {/* Navigation components can be added here if needed */}
      </div>
      
      {/* Map through the decks array and render each deck using the Deck component */}
      {decks.map((deck, index) => (
        <Deck 
          key={index}
          deckName={deck.deckName} 
          description={deck.description} 
          createdBy={deck.createdBy} 
          deckId={deck._id} 
        />
      ))}
    </section>
  );
};

export default MainPage;
