const db = require('../config/connection');
const mongoose = require('mongoose');
const { Card, Deck, User } = require('../models');
const cardsData = require('./cardsData.json');
const deckData = require('./deckData.json');
const userData = require('./userData.json');

// const Deck = mongoose.model('Deck', new Schema({
//   deckName: String,
//   cards: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Card',
//     },
//   ],
//   description: String,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
// }));

const newCard = mongoose.model('Card', Card);

async function seedDatabase() {
  try {
    // Clear existing data
    await Promise.all([User.deleteMany(), Deck.deleteMany(), newCard.deleteMany()]);

    // Create users
    const createdUsers = await User.create(userData);

    // Create cards
    const createdCards = await newCard.create(cardsData);

    // Create decks
    const createdDecks = await Deck.create(
      deckData.map((deck, index) => ({
        ...deck,
        createdBy: createdUsers[index % createdUsers.length]._id,
        cards: createdCards.slice(index * 2, (index + 1) * 2), // Each deck has 2 cards
      }))
    );

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
