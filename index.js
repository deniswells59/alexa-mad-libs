'use strict';

const Alexa = require('alexa-app');
const app = new Alexa.app('MadLibs');
const AlexaSkill = require('./AlexaSkill');
const alexaSkill = new AlexaSkill();
const _ = require('lodash');

let fullStory = '';
let blank = {};
let nextQueryPrompt = '';

app.launch((req, res) => {
  const prompt = 'Welcome to the Mad Libs app. Which story would you like to hear?';
  const reprompt = 'I\'m confused. Try again.';
  res.say(prompt).reprompt(reprompt).shouldEndSession(false);
});

app.intent('story', {
  'slots': {
    'NAME': 'Stories',
  },
  'utterances': ['{Let\'s play|Let\'s hear} {|a} {NAME} {|story}'],
},
  (req, res) => {
    const chosenStory = req.slot('NAME');
    const reprompt = 'The choices are troll. ' +
      'Say, let\'s hear a troll story.';
    if (_.isEmpty(chosenStory)) {
      const prompt = 'I\'m confused. Try again.';
      res.say(`${prompt} ${reprompt}`).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      alexaSkill.getStory(chosenStory, (err, story, obj) => {
        if (err) {
          const prompt = err;
          res.say(`${prompt} ${reprompt}`).reprompt(reprompt).shouldEndSession(false)
            .send();
          return true;
        }

        fullStory = story;
        blank = obj;

        res.session('story', chosenStory);
        res.session('query', 'name');
        nextQueryPrompt = 'Say a name.';
        res.say(`Let\'s get started! ${nextQueryPrompt}`).shouldEndSession(false).send();
        return false;
      });
    }
  }
);

app.intent('blank', {
  'slots': {
    'WORD': 'AMAZON.LITERAL',
  },
  'utterances': ['{|my} {|word} {|is} {WORD}'],
},
  (req, res) => {
    const word = req.slot('WORD');
    const query = req.session('query');

    if (!query) {
      const prompt = 'Hmm. I\'m not sure what story you want to hear.';
      const reprompt = 'The choices are troll. ' +
        'Try saying, let\'s hear a troll story.'
      res.say(`${prompt} ${reprompt}`).reprompt(reprompt).shouldEndSession(false);
      return true;
    }

    if (_.isEmpty(word)) {
      const prompt = 'Hmm. I\'m not sure what you said. Try again.';
      res.say(`${prompt} ${nextQueryPrompt}`).reprompt(nextQueryPrompt).shouldEndSession(false);
      return true;
    } else {

      blank[query] = word;

      if (query === 'name') {
        const genderArr = alexaSkill.getGender(word);
        blank.gender.subject = genderArr[0];
        blank.gender.object = genderArr[1];
        blank.gender.possessive = genderArr[2];
        blank.gender.gender = genderArr[3];
      }

      const vowelCheck = query.split('$');
      if (vowelCheck.length > 1) {
        blank[vowelCheck[vowelCheck.length - 1]] = alexaSkill.articleCheck(word);
      }

      let nextQuery = '';
      Object.keys(blank).some(key => {
        nextQuery = key;
        return blank[key] === 'N/A';
      });

      if (nextQuery === res.session('query')) {
        endGame(res, res.session('story'));
        return false;
      }
      res.session('query', nextQuery);
      const queryCheck = nextQuery.split('$');
      if (queryCheck.length > 1) {
        nextQuery = queryCheck[0];
      }
      nextQuery = nextQuery.split('_');
      nextQuery.splice(nextQuery.length - 1, 1);
      nextQuery = nextQuery.length > 1 ? nextQuery.join(' ') : nextQuery[0];
      const letters = nextQuery.split('');
      if (letters[0] === 'a') {
        nextQueryPrompt = `Say an ${nextQuery}.`;
        res.say(nextQueryPrompt).shouldEndSession(false).send();
        return false;
      }
      nextQueryPrompt = `Say a ${nextQuery}.`;
      res.say(nextQueryPrompt).shouldEndSession(false).send();
      return false;
    }
  }
);

const endGame = function (res, name) {
  if (name === 'troll') {
    res.say(`Okay. Here\'s your story. ${fullStory({
      name: blank.name,
      genderSubject: blank.gender.subject,
      genderObject: blank.gender.object,
      genderPossessive: blank.gender.possessive,
      gender: blank.gender.gender,
      location_1: blank.location_1,
      adjective_1: blank.adjective_1,
      verb_ending_with_e_d_1: blank.verb_ending_with_e_d_1,
      adjective_4: blank.adjective_4,
      color_1: blank.color_1,
      adjective_5$vowel1: blank.adjective_5$vowel1,
      vowel1: blank.vowel1,
      adjective_ending_with_l_y_1: blank.adjective_ending_with_l_y_1,
      body_part_1: blank.body_part_1,
      adjective_6: blank.adjective_6,
      adjective_ending_with_l_y_2: blank.adjective_ending_with_l_y_2,
      noun_1: blank.noun_1,
      length_of_time_1: blank.length_of_time_1,
      noun_2: blank.noun_2,
    })} The End. Thanks for playing!`)
      .shouldEndSession(true).send();
    return false;
  }
};

app.error = (exception) => {
  console.log(exception);
  throw exception;
};

module.exports = app;
