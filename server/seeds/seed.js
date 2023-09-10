const db = require('../config/connection');
const { Card, Deck, User } = require('../models');

const cardsData = require('./cardsData.json');
const deckData = require('./deckData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  // clean database
  await Card.deleteMany({});
  await Deck.deleteMany({});
  await User.deleteMany({});

  // bulk create each model
  const card = await Card.insertMany(cardsData);
  const deck = await Deck.insertMany(deckData);
  const user = await User.insertMany(userData);

  // for (newClass of classes) {
  //   // randomly add each class to a school
  //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
  //   tempSchool.classes.push(newClass._id);
  //   await tempSchool.save();

  //   // randomly add a professor to each class
  //   const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
  //   newClass.professor = tempProfessor._id;
  //   await newClass.save();

  //   // reference class on professor model, too
  //   tempProfessor.classes.push(newClass._id);
  //   await tempProfessor.save();
  // }

  console.log('all done!');
  process.exit(0);
});
