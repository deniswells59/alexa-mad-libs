'use strict';

const stories = require('./stories');
const gender = require('gender');

function AlexaSkill() {
}

AlexaSkill.prototype.getStory = function (name, cb) {
  if (!stories[name]) {
    cb('That story does not exist.');
  }
  cb(null, stories[name].story, stories[name].obj);
};

AlexaSkill.prototype.getGender = function (name) {
  const currentGender = gender.guess(name).gender;

  if (currentGender === 'male') {
    return ['he', 'him', 'his', 'boy'];
  }
  return ['she', 'her', 'her', 'girl'];
};

AlexaSkill.prototype.articleCheck = function (word) {
  const letters = word.split('');
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  let article = 'a';
  for (let i = 0; i < vowels.length; i++) {
    if (vowels[i] === letters[0]) article = 'an';
  }
  return article;
};

module.exports = AlexaSkill;
