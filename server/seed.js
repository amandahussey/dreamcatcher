const { db, Dream } = require('./db/models');

const dreams = [
  {
    dream: 'So last night I dreamt that I was a baby again. An adult sized baby. It was very weird. And I saw Breena from high school. She was not amused.'
  },
  {
    dream: 'I dreamt that I was hiding from a giant dinosaur. I was carrying Nicholas, and he was so heavy that I was falling behind everyone else. It was really scary'
  },
  {
    dream: 'I was in the land of cakes and candy. Everything was shiny and bright.'
  },
  {
    dream: 'Another one where I am naked at school. At least nobody seemed to notice but me',
  },
  {
    dream: 'Well, all my teeth fell out again...'
  },
  {
    dream: 'I dreamt that I was on a pirate ship, in search of treasure!'
  },
  {
    dream: 'Another one where I wake up on the day of the test, very stressful. So happy I am not in school anymore',
  },
  {
    dream: 'I keep having the same dream. They are chasing after me, and I cannot seem to run fast enough',
  },
];


db
  .sync({ force: true })
  .then(() => {
    return Promise.all(
      dreams.map(dream => {
        return Dream.create(dream);
      })
    );
  })
  .then(() => {
    console.log('success!!');
  })
  .catch(err => console.error(err));
