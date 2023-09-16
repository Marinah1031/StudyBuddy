//previous button
//next button

//flip button

// src/components/FlippingCard.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_SINGLE_DECK } from '../utils/querys';
import { useParams } from 'react-router-dom';
import CardComponent from '../components/cards';
import styles from './CardPage.module.css';

const CardPage = () => {
  const { deckId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, data } = useQuery(FIND_SINGLE_DECK, {
    variables: { deckId: deckId },
  });

  const cards = data?.viewDeck?.cards || [];

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

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
  }, [cards]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles['card-page']}>
      <div className={styles['card-nav']}>
        <button className={styles['nav-button1']} onClick={prevCard}>
          {"<"}
        </button>
        <button className={styles['nav-button2']} onClick={nextCard}>
          {">"}
        </button>
      </div>
      {cards.length > 0 ? (
        <CardComponent
          currentIndex={currentIndex}
          currentCard={currentIndex}
          term={cards[currentIndex]?.term || ''}
          definition={cards[currentIndex]?.definition || ''}
        />
      ) : (
        <p>No Cards to show</p>
      )}
    <section>
      <h1>title</h1>
      <h2>definition</h2>
      {<div>
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
        {cards.length > 1 ? cards.map((card, i) => (
          <CardComponent currentIndex={currentIndex} key={i} currentCard={i} term={card.term} definition={card.definition}/>
        ))
          : "no Cards to show"}
      </div>}
    </section>
  );
};

export default CardPage;


// function CardComponent({ title, definition }) {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const currentCard = cards[currentIndex];

//   const flipCard = () => {
//     setIsFlipped(!isFlipped);
//   };

//   const nextCard = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
//     setIsFlipped(false);
//   };

//   const prevCard = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? cards.length - 1 : prevIndex - 1
//     );
//     setIsFlipped(false);
//   };

//   return (
//     <section>
//       <h1>title</h1>
//       <h2>definition</h2>
//       {  <div>
//            <button onClick={prevCard}>Previous</button>
//             <button onClick={nextCard}>Next</button>
//     {cards.length > 1 ? cards.map((card) => (
//             <div className={`card ${isFlipped ? 'flipped' : ''}`}>
//             <div className="card-inner front">
//               <button onClick={flipCard}>Flip</button>
//               <p>{card.term}</p>
//             </div>
//             <div className="card-inner back">
//               <button onClick={flipCard}>Flip</button>
//               <p>{card.definition}</p>
//             </div>

//           </div>
//         ))
//       :"no Cards to show"}
//    </div>}
//     </section>
//   )
