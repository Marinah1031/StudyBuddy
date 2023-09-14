//previous button
//next button

//flip button

// src/components/FlippingCard.js
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_ALL_DECKS } from '../utils/querys';

const CardPage = () => {
//   const { loading, error, data } = useQuery(FIND_ALL_DECKS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const cards = data.cards;

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
    setIsFlipped(false);
  };

  const currentCard = cards[currentIndex];


  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-inner front">
        <button onClick={flipCard}>Flip</button>
        <p>{currentCard.frontText}</p>
      </div>
      <div className="card-inner back">
        <button onClick={flipCard}>Flip</button>
        <p>{currentCard.backText}</p>
      </div>
      <button onClick={prevCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </div>
  );
};

export default CardPage;
