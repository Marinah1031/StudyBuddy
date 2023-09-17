import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_SINGLE_DECK } from '../utils/querys';
import { useParams, useNavigate } from 'react-router-dom';
import CardComponent from '../components/cards';
import styles from './CardPage.module.css';




const CardPage = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
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
  const routeChange = () => { 
    navigate("./edit", { relative: "path"});
}
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
    
      <button id='' onClick={routeChange}>Edit Deck</button>
  
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
    </section>

  );
};

export default CardPage;