import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './main.module.css';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ONE_USER  } from '../utils/querys';

function Deck({ deckName, description, createdBy, deckId }) {
  const { loading, data} = useQuery(GET_ONE_USER
    , {variables: { userId: createdBy }});

  const username = (data?.getUser?.username || '');

  if (loading) return <p>Loading...</p>;

  return (
    <section key={deckId}>
      <div className={styles['deck-container']}>
        <button className={styles['deck-link']}>
          <Link to={`/saved/${deckId}`} className={styles['deck-link']}>
            <div className={styles['deck-info']}>
              <p className={styles['deck-name']}>{deckName}</p>
              <p className={styles['description']}>{description}</p>
              <p className={styles['created-by']}>Created by: {username}</p>
            </div>
          </Link>
        </button>
      </div>
    </section>
  );
}

export default Deck;