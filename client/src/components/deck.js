import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_SINGLE_CARD, REMOVE_CARD } from '../utils/mutations';

const DeckComponent = ({ term: initialTerm, definition: initialDefinition, cardId, deckId, createdBy }) => {
    // State for managing the term and definition inputs
    const [term, setTerm] = useState(initialTerm);
    const [definition, setDefinition] = useState(initialDefinition);

    // GraphQL mutations for editing and removing a card
    const [editSingleCard] = useMutation(EDIT_SINGLE_CARD);
    const [removeCard] = useMutation(REMOVE_CARD);

    // Event handler for input changes
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

    // Event handler for submitting card edits
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

    // Event handler for deleting a card
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
                {/* Input for editing the term */}
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
                {/* Textarea for editing the definition */}
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
                {/* Submit button to save edits */}
                <input className='saveEdit' type="submit" value="Save" />                
            </form>
            {/* Button to delete the card */}
            <button id='deleteCard' onClick={deleteCard}>Delete</button>
        </div>
    );
}

export default DeckComponent;
