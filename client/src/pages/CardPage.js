//previous button
//next button

//flip button

// src/components/FlippingCard.js
import React, { useState, } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_ALL_DECKS } from '../utils/querys';
import { FIND_SINGLE_DECK } from '../utils/querys';
import { useParams } from 'react-router-dom';
import CardComponent from '../components/cards'


const CardPage = () => {
  const { deckId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, data } = useQuery(FIND_SINGLE_DECK, {
    variables: { deckId: deckId },
  });
  if (loading) return <p>Loading...</p>;

  const cards = data?.viewDeck?.cards || [];

  // const currentCard = cards[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };


  return (
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
  )
};

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

export default CardPage;
