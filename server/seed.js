const { db, Dream } = require('./db/models');

const dreams = [
  {
    dream: 'So last night I dreamt that I was a baby again. An adult sized baby. It was very weird.'
  },
  {
    dream: 'I dreamt that I was hiding from a giant dinosaur. I was carrying a baby, but he was so heavy that I was falling behind everyone else. I woke up before the dinossaur got me. It was terrible. I felt so helpless.'
  },
  {
    dream: 'I was in the land of cakes and candy. Everything was shiny and bright.'
  },
  {
    dream: 'Another one where I am naked at school. I was so embarassed. At least nobody seemed to notice but me',
  },
  {
    dream: 'Well, all my teeth fell out again. One of those recurring nightmares.'
  },
  {
    dream: 'I dreamt that I was on a pirate ship, in search of treasure. Adventure dreams are the best.'
  },
  {
    dream: 'Another one where I wake up on the day of the test, very stressful. So happy I am not in school anymore. My teeth fell out again too, so there you go.',
  },
  {
    dream: 'I keep having the same dream. They are chasing after me, and I cannot seem to run away fast enough. So scary.',
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
