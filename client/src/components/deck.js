import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_SINGLE_CARD, REMOVE_CARD } from '../utils/mutations';

const DeckComponent = ({ term: initialTerm, definition: initialDefinition, cardId, deckId, createdBy }) => {
    const [term, setTerm] = useState(initialTerm);
    const [definition, setDefinition] = useState(initialDefinition);

    const [editSingleCard] = useMutation(EDIT_SINGLE_CARD);
    const [removeCard] = useMutation(REMOVE_CARD);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'term':
                setTerm(value);
                break;
            case 'definition':
                setDefinition(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (window.confirm(`Are you sure you want to UPDATE this card?`))
        {
            try {
                await editSingleCard({
                    variables: {
                        deckId: deckId,
                        cardId: cardId,
                        updatedTerm: term,
                        updatedDefinition: definition,
                    },
                });
                
                alert("Card Successfully UPDATED!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    const deleteCard = async () => {
        if (window.confirm("Are you sure you want to DELETE this card?"))
        {
            try {
                await removeCard({
                    variables: {
                        deckId: deckId,
                        cardId: cardId,
                    },
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="editCard">
            <form id='cardEditList' onSubmit={handleSubmit}>
                <label>
                    <input
                        className='termEdit'
                        type="text"
                        name="term"
                        value={term}
                        onChange={handleChange}
                        cols="40" rows="5"
                    />
                </label>
                <label>
                    <textarea
                        className='definitionEdit'
                        type="text"
                        name="definition"
                        value={definition}
                        onChange={handleChange}
                        cols="40" rows="5"
                    />
                </label>
                <input className='saveEdit' type="submit" value="Save" />                
            </form>
            <button id='delteCard' onClick={deleteCard}>Delete</button>
        </div>
    );
}

export default DeckComponent;