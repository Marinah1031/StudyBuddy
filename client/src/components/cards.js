import React, { useState, } from 'react';
// import { useQuery } from '@apollo/client';
// import { FIND_ALL_DECKS } from '../utils/querys';
// import { FIND_SINGLE_DECK} from '../utils/querys';
// import { useParams} from 'react-router-dom';

function CardComponent({ term, definition, currentIndex, currentCard }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <section style={{display: currentIndex === currentCard ? "" : "none"}}>
          
            <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                <div className="card-inner front">
                    <button onClick={flipCard}>Flip</button>
                    <p>{term}</p>
                </div>
                <div className="card-inner back">
                    <button onClick={flipCard}>Flip</button>
                    <p>{definition}</p>
                </div>
            </div>
        </section>
    )
}

export default CardComponent;