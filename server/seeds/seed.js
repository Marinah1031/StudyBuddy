const db = require('../config/connection');
const { Card, Deck, User } = require('../models');

const cardsData = require('./cardsData.json');
const deckData = require('./deckData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  // clean database
  try {
  await Card.deleteMany({});
  await Deck.deleteMany({});
  await User.deleteMany({});

  // bulk create each model
  await Card.insertMany(cardsData);
  await Deck.insertMany(deckData);
  await User.insertMany(userData);
  
      // for (let i = 0; i < thoughtSeeds.length; i++) {
      //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      //   const user = await User.findOneAndUpdate(
      //     { username: thoughtAuthor },
      //     {
      //       $addToSet: {
      //         thoughts: _id,
      //       },
      //     }
      //   );
      // }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all done!');
    process.exit(0);
    });
