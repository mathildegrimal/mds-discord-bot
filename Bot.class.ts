import { TextChannel } from 'discord.js';
const { Client, Intents } = require('discord.js');
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { hellos, howAreYou, helloKeywords, mentions } = require('./messages');
import { getCommands } from './deploy-commands';

export class Bot {
    client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
    rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

    commands = getCommands();

    ready() {
        this.client.once('ready', () => {
            console.log(`logged in as ${this.client.user.tag}`);
        });
    }

    putCommands() {
        this.rest
            .put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                { body: this.commands }
            )
            .then(() =>
                console.log('Successfully registered application commands.')
            )
            .catch(console.error);
    }

    listenMessages() {
        this.client.on('messageCreate', async (message: any) => {
            const { content, channel } = message;

            if (content.includes(this.client.user.id)) {
                const messageContent = content.split(
                    `<@!${this.client.user.id}> `
                )[1];

                if (messageContent) {
                    const specialChars =
                        /[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

                    if (
                        helloKeywords.includes(
                            messageContent.split(specialChars)[0].toLowerCase()
                        )
                    ) {
                        //reply when user says "hello" or other hello keyword
                        const messageToSend = `${
                            hellos[this.getRandom(hellos)]
                        } ${message.author.username} ! ${
                            howAreYou[this.getRandom(howAreYou)]
                        } ?`;
                        channel.send(messageToSend);
                    } else {
                        //reply when  mention of the bot by the user in message
                        channel.send(mentions[this.getRandom(mentions)]);
                    }
                } else {
                    //reply when  mention of the bot by the user (whithout message)
                    channel.send(mentions[this.getRandom(mentions)]);
                }
            }
        });
    }

    listenInteractions() {
        this.client.on('interactionCreate', async (interaction) => {
           if (!interaction.isCommand()) return;

           const command = this.client.commands.get(interaction.commandName);

           if (!command) return;

           try {
               await command.execute(interaction);
           } catch (error) {
               console.error(error);
               await interaction.reply({
                   content: 'There was an error while executing this command!',
                   ephemeral: true,
               });
           }
        });
    }

    login() {
        this.client.login(process.env.BOT_TOKEN);
    }

    getRandom(array: Array<string>) {
        return Math.floor(Math.random() * (array.length - 1));
    }

    sendMessage(channel: TextChannel, message: string) {
        channel.send(message);
    }

    init() {
        this.ready();
        this.putCommands();
        this.listenMessages();
        this.listenInteractions();
        this.login();
    }
}
