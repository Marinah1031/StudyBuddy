import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import './cards.css';
import { Link } from 'react-router-dom';
import { FIND_ALL_USERS } from '../utils/querys';

function Deck ({ deckName, description, createdBy, deckId }) {
 


        return (
            <section>
                   <Navbar />
                   <button>
                   <Link to={`/saved/${deckId}`}>
                <div>
                  <p>{deckName}</p>
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
                </Link>
                </button>
            </section>
          );
}

export default Deck;
