import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './main.module.css'; // Import CSS module styles
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ONE_USER } from '../utils/querys';

function Deck({ deckName, description, createdBy, deckId }) {
  // Query to get user information based on createdBy
  const { loading, data } = useQuery(GET_ONE_USER, { variables: { userId: createdBy } });

  // Extract username from the query result
  const username = (data?.getUser?.username || '');

  if (loading) return <p>Loading...</p>;

  return (
    <section key={deckId}>
      <div className={styles['deck-container']}>
        <button className={styles['deck-link']}>
          {/* Link to the deck's details page */}
          <Link to={`/saved/${deckId}`} className={styles['deck-link']}>
            <div className={styles['deck-info']}>
              {/* Display deck name */}
              <p className={styles['deck-name']}>{deckName}</p>
              {/* Display deck description */}
              <p className={styles['description']}>{description}</p>
              {/* Display the username of the creator */}
              <p className={styles['created-by']}>Created by: {username}</p>
            </div>
          </Link>
        </button>
      </div>
    </section>
  );
}

export default Deck;
