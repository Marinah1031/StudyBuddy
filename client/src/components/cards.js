import React, { useState, useEffect } from 'react';
import './cards.css';


function CardComponent({ term, definition, currentIndex, currentCard, deckId}) {
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
    // This is a JSX section element with inline CSS to control its display.
    <section style={{ display: currentIndex === currentCard ? '' : 'none' }}>
          {/* This is a button element with a conditional class 'flipped' based on the 'isFlipped' state.
         It also has an onClick event handler 'handleClick' attached. */}
      <button className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
          {/* This is the front side of the card with a title displayed. */}
        <div className="card-inner front">
          <p className='title-card-inner-front'>{term}</p>
        </div>
          {/* This is the back side of the card with the definition displayed. */}
        <div className="card-inner back">
          <p className='title-card-inner-back'>{definition}</p>
        </div>
      </button>
     
    </section>

  );
}

export default CardComponent;
