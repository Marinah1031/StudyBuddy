import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FIND_SINGLE_DECK } from '../utils/querys';
import { ADD_CARD, EDIT_DECK } from '../utils/mutations';
import { useParams, useNavigate } from 'react-router-dom';
import DeckComponent from '../components/deck';


const DeckEditPage = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();

    const [addCard] = useMutation(ADD_CARD);
    const [editDeck] = useMutation(EDIT_DECK);
    const { loading, data } = useQuery(FIND_SINGLE_DECK, {
        variables: { deckId: deckId }
    });

    const [deckName, setDeckName] = useState(data?.viewDeck?.deckName || '');
    const [description, setDescription] = useState(data?.viewDeck?.description || '');
    const cards = data?.viewDeck?.cards || [];
    
    useEffect(() => {
        if (!loading && data) {
            setDeckName(data.viewDeck.deckName || '');
            setDescription(data.viewDeck.description || '');
        }
    }, [loading, data]);

    if (loading) return <p>Loading...</p>;

    const routeChange = () => { 
        editDeck({
            variables: {
                deckId: deckId,
                updatedDeckName: deckName,
                updatedDescription: description,
            },
        });

        navigate('..', { relative: 'path'});
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'deckName':
                setDeckName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const newCard = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });

        try {
            addCard({
                variables: {
                    deckId: deckId,
                    term: '',
                    definition: '',
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='cardList'>
            <div className='editDeck'>
                <h1>Title</h1>
                <input
                    type='text'
                    rows="2"
                    name='deckName'
                    value={deckName}
                    onChange={handleChange}
                />

                <h2>Description</h2>
                <input
                    type='text'
                    rows="2"
                    name='description'
                    value={description}
                    onChange={handleChange}
                />     
            </div>
            <h2>Cards</h2>
            {cards.map((card, index) => (
                <DeckComponent key={index} term={card.term} definition={card.definition} deckId={deckId} cardId={card._id} createdBy={data.viewDeck.createdBy} />
            ))}
            <button id='addCard' onClick={newCard}>Add New Card</button>
            <button id='finishEdit' onClick={routeChange}>Done Editing</button>
        </div>
    );
}

export default DeckEditPage;