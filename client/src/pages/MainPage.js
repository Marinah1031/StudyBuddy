import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_ALL_DECKS } from '../utils/querys';
import { useParams } from 'react-router-dom';
import styles from './CardPage.module.css';
import Deck from '../components/main';

const MainPage = () => {
//   const { deckId } = useParams();
//   const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, data } = useQuery(FIND_ALL_DECKS);

  const decks = data?.allDecks || [];

//   const nextCard = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
//   };

//   const prevCard = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? cards.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === 'ArrowLeft') {
//         prevCard();
//       } else if (e.key === 'ArrowRight') {
//         nextCard();
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);

//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [decks]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles['card-page']}>
      <div className={styles['card-nav']}>
        {/* <button className={styles['nav-button1']} onClick={prevCard}>
          {"<"}
        </button>
        <button className={styles['nav-button2']} onClick={nextCard}>
          {">"}
        </button> */}
      </div>
      {decks.map((decks) => (
                <Deck deckName={decks.deckName} description={decks.description} createdBy={decks.createdBy} deckId={decks._id} />
            ))}
       {/* : (
        <p>No Cards to show</p>
      ) */}
    </section>
  );
};

export default MainPage;

// deckName={decks.deckName}
// description={decks.description}
// createdBy={decks.createdBy}
// deckId={decks._id}