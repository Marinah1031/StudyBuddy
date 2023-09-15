//card set title
//term
//definition

import React, { useState, } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_SINGLE_DECK } from '../utils/querys';
import { useParams, useNavigate } from 'react-router-dom';
import DeckComponent from '../components/deck';

const DeckEdit = () => {
    const { deckId } = useParams();
    const navigate = useNavigate(); 

    const routeChange = () =>{ 
      navigate("..", { relative: "path"});
    }

    const { loading, data } = useQuery(FIND_SINGLE_DECK, {
        variables: { deckId: deckId }
    });
    if (loading) return <p>Loading...</p>;

    const cards = data?.viewDeck?.cards || [];


    return (
        <div>
            {cards.map((card, index) => (
                <DeckComponent key={index} term={card.term} definition={card.definition} deckId={deckId} cardId={card._id} />
            ))}
            <button onClick={routeChange}>Done Editing</button>
        </div>
    );
}

export default DeckEdit;