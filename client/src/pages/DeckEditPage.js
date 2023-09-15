import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FIND_SINGLE_DECK } from '../utils/querys';
import { ADD_CARD } from '../utils/mutations';
import { useParams, useNavigate } from 'react-router-dom';
import DeckComponent from '../components/deck';

const DeckEditPage = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();

    const [addCard] = useMutation(ADD_CARD);

    const routeChange = () => { 
        navigate("..", { relative: "path"});
    }

    const newCard = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });

        try {
            addCard({
                variables: {
                    deckId: deckId,
                    term: "",
                    definition: "",
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const { loading, data } = useQuery(FIND_SINGLE_DECK, {
        variables: { deckId: deckId }
    });

    if (loading) return <p>Loading...</p>;

    const cards = data?.viewDeck?.cards || [];


    return (
        <div className='cardList'>
            {cards.map((card, index) => (
                <DeckComponent key={index} term={card.term} definition={card.definition} deckId={deckId} cardId={card._id} />
            ))}
            <button id='addCard' onClick={newCard}>Add New Card</button>
            <button id='finishEdit' onClick={routeChange}>Done Editing</button>
        </div>
    );
}

export default DeckEditPage;