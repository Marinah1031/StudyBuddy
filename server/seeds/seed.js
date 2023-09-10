// Import necessary modules and models
const mongoose = require('mongoose');
const User = require('../models/User');
const Flashcard = require('../models/Flashcard');
const { Cards } = require('../models');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/graphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const dbName = mongoose.connection.name;
// console.log('Connected to database:', dbName);

// Define your seed data
const usersData = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more user data as needed
];

const cardsData = [
  { question: 'What is JavaScript?', answer: 'A programming language.', category: 'Programming' },
  { question: 'What is HTML?', answer: 'A markup language for web pages.', category: 'Web Development' },
  // Add more flashcard data as needed
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing data (optional)
    await User.deleteMany({});
    await Cards.deleteMany({});

    // Seed users
    const users = await User.create(usersData);

    // Seed flashcards with references to users
    const cards = cardsData.map((card, index) => ({
      ...card,
      createdBy: users[index % users.length]._id,
    }));
    await card.create(cards);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

// Call the seedDatabase function to start seeding
seedDatabase();
