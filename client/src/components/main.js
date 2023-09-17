import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './main.module.css';
import { Link } from 'react-router-dom';

function Deck({ deckName, description, createdBy, deckId }) {
  return (
    <section key={deckId}>
      <div className={styles['deck-container']}>
        <button className={styles['deck-link']}>
          <Link to={`/saved/${deckId}`} className={styles['deck-link']}>
            <div className={styles['deck-info']}>
              <p className={styles['deck-name']}>{deckName}</p>
              <p className={styles['description']}>{description}</p>
              <p className={styles['created-by']}>Created by: {createdBy}</p>
              {/* <p className={styles['deck-id']}>Deck ID: {deckId}</p> */}
            </div>
          </Link>
        </button>
      </div>
    </section>
  );
}

export default Deck;
