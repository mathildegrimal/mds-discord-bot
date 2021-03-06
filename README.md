
- [MyWonderFulBot, a wonderful bot for discord that is useless but was fun to develop](#mywonderfulbot-a-wonderful-bot-for-discord-that-is-useless-but-was-fun-to-develop)
  - [1. Technologies](#1-technologies)
    - [Hosting](#hosting)
  - [2. How to install this bot on your server](#2-how-to-install-this-bot-on-your-server)
  - [3. How to talk with the bot](#3-how-to-talk-with-the-bot)
  - [4. How to reuse the project and personalize it](#4-how-to-reuse-the-project-and-personalize-it)
    - [Installation](#installation)
    - [Add other commands](#add-other-commands)
    - [Deployment](#deployment)

# MyWonderFulBot, a wonderful bot for discord that is useless but was fun to develop

================================================================

## 1. Technologies

The bot is writen in [TypeScript](https://www.typescriptlang.org/), built using [node.js](https://nodejs.org/en/) and the [discord.js](https://discord.js.org/#/) library.
Good guide to understand how to code bots [here](https://discordjs.guide/)

### Hosting
The bot is currently hosted on Heroku. See [Deployment section](#deployment)

## 2. How to install this bot on your server

Just paste this link in your browser :
[MyWonderfulBot Link](https://discord.com/oauth2/authorize?client_id=951392211700969524&permissions=2048&scope=bot%20applications.commands)

## 3. How to talk with the bot

- type /commands to receive an embed message with all the interactions you can have with the bot
- Mention @MyWonderfulBot and it will send you a kind message to offer you help.
- Say "hello" (language you want between italian, spanish, deutch, english, french and chinese) and it will answer you ! But it is not smart enough to answer in the same language as you. It is often confused between english and italian or spanish so...be patient and kind.
- type /random, and choose min and max : it will send you a random number between min and max, so you can play the lotto or wtf game you want
- type /meteo to have a link to the daily weather in your city


## 4. How to reuse the project and personalize it

### Installation

You can clone or fork this git repository but first you will have to set an application on your discord account and create a bot. See the first steps of the discord.js module [here](https://discordjs.guide/preparations/).

The steps are more ore less resumed below :

 - Create an application in the developers section of your Discord, Applications section
 - Add a BOT in the BOT part of the application, this is where you can get the TOKEN BOT used for this application
 - Generate an URL and paste it in browser to access the list of servers where you want to add the BOT

Then you will have to put a .env file a the root of your application with these variables :

```
CLIENT_ID=<your_app_client_id>
GUILD_ID=<your_server_id> // server in wich you want to use the bot
BOT_TOKEN=<your_bot_token>
```

### Add other commands

You have to read first how to create commands [here](https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands).
<br>
To create new commands, add a file in the folder commands with the command you want to add.
A command is basically like this : 

```typescript
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Replies with random number!")
    .addNumberOption((option) =>
      option.setName("min").setDescription("Enter a number").setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName("max").setDescription("Enter a number").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("Coucou!");
  },
};

```
All commands added in the command folder will automatically be deployed on your bot by the getCommands() function, called in the Bot Class.

### Deployment

We advise to use **Heroku** for the hosting of the application (or any other solution offering the same possibilities).
Heroku is a PaaS (Platform as a Service) that allows to host applications on the Cloud. The main advantage is to be able to automatically deploy applications from online repos, hosted on Github for example.

You must first create an account on https://www.heroku.com/, and a new app.
You must also create a new repo on your github account and clone the Captain Hook repo.

On the page of your application, several tabs allow you to configure the app.

On the tab ***Settings***, go to *Config Vars* to enter the conig vars as in the .env file.
