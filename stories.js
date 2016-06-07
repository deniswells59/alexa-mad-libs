const _ = require('lodash');

const trollBlank = {
  name: 'N/A',
  gender: {
    subject: 'N/A',
    object: 'N/A',
    possessive: 'N/A',
    gender: 'N/A',
  },
  location_1: 'N/A',
  adjective_1: 'N/A',
  verb_ending_with_e_d_1: 'N/A',
  adjective_4: 'N/A',
  color_1: 'N/A',
  adjective_5$vowel1: 'N/A',
  vowel1: 'N/A',
  adjective_ending_with_l_y_1: 'N/A',
  body_part_1: 'N/A',
  adjective_6: 'N/A',
  adjective_ending_with_l_y_2: 'N/A',
  noun_1: 'N/A',
  length_of_time_1: 'N/A',
  noun_2: 'N/A',
};

const trollStory = _.template('One day, a ${gender} named ${name} went for a ' +
'walk through the woods to get to ${location_1}. Everything was bright and ${adjective_1}. ' +
'Then, ${genderSubject} came to an old, bridge. A troll ${verb_ending_with_e_d_1} out from under the bridge. ' +
'He had ${adjective_4}, ${color_1} eyes and ${vowel1} ${adjective_5$vowel1} body. ' +
'${name} ${adjective_ending_with_l_y_1} stepped back, but knew in ${genderPossessive} ' +
'${body_part_1} that ${genderSubject} must be brave and ${adjective_6}. The troll said, ' +
'"Answer my question and you\'ll be free to pass!" "No problem!" ${name} said ' +
'${adjective_ending_with_l_y_2}. The troll asked ${genderObject}, "What is my favorite ${noun_1}?" ' +
'${name} thought for ${length_of_time_1}. Finally ${genderSubject} said, "Your favorite ' +
'${noun_1} is ${noun_2}!" The trolled gasped, "How did you know?" He ${verb_ending_with_e_d_1} ' +
'back under the bridge. ${name} ran as fast as ${genderSubject} could to ${location_1}.');

module.exports = {
  troll: {
    story: trollStory,
    obj: trollBlank,
  },
};
