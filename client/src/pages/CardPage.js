import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_SINGLE_DECK, QUERY_ME } from '../utils/querys';
import { useParams, useNavigate } from 'react-router-dom';
import CardComponent from '../components/cards';
import styles from './CardPage.module.css';

const CardPage = () => {
  // Get the deckId from the URL params
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data for the selected deck using useQuery
  const { loading, data } = useQuery(FIND_SINGLE_DECK, {
    variables: { deckId: deckId },
  });

  // Fetch user data using useQuery
  const { data: thisUser } = useQuery(QUERY_ME);

  // Extract cards from the fetched data
  const cards = data?.viewDeck?.cards || [];

  // Function to navigate to the "Edit Deck" page
  const routeChange = () => {
    navigate("./edit", { relative: "path" });
  }

  // Function to go to the next card
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // Function to go to the previous card
  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  // Handle key presses for navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevCard();
      } else if (e.key === 'ArrowRight') {
        nextCard();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  if (loading) return <p>Loading...</p>;

  return (
     // This is a JSX section element with a CSS class 'card-page'.
    <section className={styles['card-page']}>
      <div className={styles['card-container']}>
         {/* Conditional rendering: Check if there are cards in the 'cards' array */}
        {cards.length > 0 ? (
           // If there are cards, render the 'CardComponent' with the current card's data
          <CardComponent
            currentIndex={currentIndex}
            currentCard={currentIndex}
            term={cards[currentIndex]?.term || ''}
            definition={cards[currentIndex]?.definition || ''}
          />
        ) : (
          // If there are no cards, display a message
          <p>No Cards to show</p>
        )}
          {/* This is a container for navigation buttons */}
        <div className={styles['card-nav-buttons']}>
           {/* Button to navigate to the previous card */}
          <button className={styles['nav-button1']} onClick={prevCard}>
            {"<"}
          </button>
            {/* Button to navigate to the next card */}
          <button className={styles['nav-button2']} onClick={nextCard}>
            {">"}
          </button>
        </div>
      </div>
      {
        // Render "Edit Deck" button if the deck was created by the current user
        data.viewDeck.createdBy === thisUser?.me?._id ? (
          <button id={styles['editDeck']} onClick={routeChange}>Edit Deck</button>
        ) : (
          <></>
        )
      }
    </section>
  );
};

export default CardPage;
