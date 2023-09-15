import React, { useState } from 'react';
import { useMutation } from '@apollo/client'; // Import useMutation from Apollo Client
import { EDIT_SINGLE_CARD } from '../utils/mutations';

const DeckComponent = ({ term: initialTerm, definition: initialDefinition, cardId, deckId }) => {
    const [term, setTerm] = useState(initialTerm);
    const [definition, setDefinition] = useState(initialDefinition);

    // Use useMutation to define your mutation function
    const [editSingleCard] = useMutation(EDIT_SINGLE_CARD);

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

        if (window.confirm("Are you sure you want to update this card?"))
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
                
                alert("Card Successfully Changed!");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="term"
                        value={term}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="definition"
                        value={definition}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default DeckComponent;
