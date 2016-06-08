# Alexa Mad Libs App
An Alexa skill targeted at kids, allowing them to fill in their own words into Alexa's saved stories. To test, clone repo and ```javascript npm install```. Now you have two options.

### Test in Alexa-App-Server
This is the quickest way for you to test using Node. Clone down [this server](https://github.com/matt-kruse/alexa-app-server.git) and place the Mad Libs App directory into the ```javascript examples/apps``` directory of the server. Run ```javascript $ node server.js``` in the examples directory and open localhost:8080/alexa/MadLibs in your browser.

### Test in broswer/device
I wrote up a tutorial [here](https://medium.com/@deniswells59/testing-a-custom-alexa-skill-on-your-device-6580ceceedcf#.m7ksaocov) for getting the skill working on your Amazon Developer account. If you have a device registered to your account, this will allow you to test with it as well. I'll include the Intent Schema and Sample Utterances below. Be sure to include a Custom Slot Type called "Stories" and at least one of my story names as an option (i.e. "troll").

### Intent Schema
```javascript
{
  "intents": [
    {
      "intent": "story",
      "slots": [
        {
          "name": "NAME",
          "type": "Stories"
        }
      ]
    },
    {
      "intent": "blank",
      "slots": [
        {
          "name": "WORD",
          "type": "AMAZON.LITERAL"
        }
      ]
    }
  ]
}
```
### Sample Utterances
```javascript
story	Let's play NAME
story	Let's hear NAME
story	Let's play a NAME
story	Let's hear a NAME
story	Let's play NAME story
story	Let's hear NAME story
story	Let's play a NAME story
story	Let's hear a NAME story
blank	{Jon|WORD}
blank	my word is {Denis|WORD}
blank	{Bridgette|WORD}
blank	my word is {Nancy|WORD}
blank	{Bill|WORD}
blank	my word is {Liz|WORD}
blank	{green|WORD}
blank	my word is {yellow|WORD}
blank	{purple|WORD}
blank	my word is {|WORD}
blank	{gold|WORD}
blank	my word is {stinky|WORD}
blank	{greasy|WORD}
blank	my word is {quickly|WORD}
blank	{sneakily|WORD}
blank	my word is {KFC|WORD}
blank	{Papa John's|WORD}
blank	my word is {church|WORD}
blank	{dude|WORD}
blank	my word is {greenish yellow|WORD}
blank	{super fast|WORD}
blank	my word is {really cool|WORD}
blank	{your mom|WORD}
blank	my word is {salmonella poisoning|WORD}
blank	{John Travolta|WORD}
blank	my word is {make a living|WORD}
blank	{they'll say anything|WORD}
blank	my word is {let it be|WORD}
blank	{three more words|WORD}
blank	my word is {not a sample|WORD}
blank	{anything|WORD}
blank	my word is {skipping|WORD}
blank	{ducked|WORD}
blank	my word is {jumped|WORD}
blank	{sanitized|WORD}
blank	my word is {spooky|WORD}
blank	{gray|WORD}
blank	my word is {old|WORD}
blank	{young|WORD}
blank	my word is {Mike|WORD}
blank	{banana|WORD}
blank	my word is {sodey pop|WORD}
blank	{unconventional|WORD}
blank	my word is {sick|WORD}
blank	{killed|WORD}
blank	my word is {scalped|WORD}
blank	{set fire|WORD}
blank	my word is {sold out|WORD}
blank	{caught fire|WORD}
blank	my word is {smelling|WORD}
blank	{stopped|WORD}
blank	my word is {bed|WORD}
blank	{burrito|WORD}
blank	my word is {video game|WORD}
blank	{flower|WORD}
blank	my word is {something|WORD}
```
