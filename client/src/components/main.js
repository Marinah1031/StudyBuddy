import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import './cards.css';

function Deck ({ deckName, description, createdBy, deckId }) {
    // const [term, setTerm] = useState(initialTerm);
    // const [definition, setDefinition] = useState(initialDefinition);

    // const [editSingleCard] = useMutation(EDIT_SINGLE_CARD);
    // const [removeCard] = useMutation(REMOVE_CARD);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     switch (name) {
    //         case 'term':
    //             setTerm(value);
    //             break;
    //         case 'definition':
    //             setDefinition(value);
    //             break;
    //         default:
    //             break;
    //     }
    // };

        return (
            <section>
                   <Navbar />
                <div>
                  <p>hi{deckName}</p>
                </div>
                <div>
                  <p>{description}</p>
                </div>
                <div>
                  <p>{createdBy}</p>
                </div>
                <div>
                  <p>{deckId}</p>
                </div>
            </section>
          );
}

export default Deck;
