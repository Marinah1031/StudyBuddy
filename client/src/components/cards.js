import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import './cards.css';

function CardComponent({ term, definition, currentIndex, currentCard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Add a useEffect to watch for changes in currentIndex
  useEffect(() => {
    setIsFlipped(false); // Reset card flip state when currentIndex changes
  }, [currentIndex]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClick = () => {
    flipCard();
  };

  return (
    <section style={{ display: currentIndex === currentCard ? '' : 'none' }}>
      <Navbar />
      <button className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
        <div className="card-inner front">
          <p>{term}</p>
        </div>
        <div className="card-inner back">
          <p>{definition}</p>
        </div>
      </button>
    </section>
  );
}

export default CardComponent;
