require('dotenv').config();

import { Collection, CommandInteraction, Message } from 'discord.js';
import path from 'path';
const { Client, Intents } = require('discord.js');
import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { hellos, howAreYou, helloKeywords, mentions, help } from '../config/messages';
import { getCommands } from '../utils/deploy-commands';

export class Bot {
    client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    constructor() {
        this.client.commands = new Collection();
        const commandFiles = fs
            .readdirSync(path.join(__dirname, '../commands'))
            .filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(
                __dirname,
                '../commands',
                file
            )).default;
            this.client.commands.set(command.data.name, command);
        }
    }

    ready() {
        this.client.once('ready', () => {
            console.log(`logged in as ${this.client.user.tag}`);
        });
    }

    putCommands() {
        const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
        const commands = getCommands();
        rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        )
            .then(() =>
                console.log('Successfully registered application commands.')
            )
            .catch(console.error);
    }

    listenMessages() {
        this.client.on('messageCreate', async (message: Message) => {
            const { content, channel } = message;
            console.log(message);

            if (content.includes(this.client.user.id)) {
                const messageContent = content.split(
                    `<@!${this.client.user.id}> `
                )[1];

                if (messageContent) {
                    //to remove special chars if user send hello with ! or another special char
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
                        channel.send(`${mentions[this.getRandom(mentions)]} ${help}`);
                    }
                } else {
                    //reply when  mention of the bot by the user (whithout message)
                    channel.send(`${mentions[this.getRandom(mentions)]} ${help}`);
                }
            }
        });
    }

    listenInteractions() {
        this.client.on(
            'interactionCreate',
            async (interaction: CommandInteraction) => {
                if (!interaction.isCommand()) return;

                const command = this.client.commands.get(
                    interaction.commandName
                );

                if (!command) return;

                try {
                    await command.execute(interaction);
                } catch (error) {
                    await interaction.reply({
                        content:
                            'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        );
    }

    login() {
        this.client.login(process.env.BOT_TOKEN);
    }

    getRandom(array: Array<string>) {
        return Math.floor(Math.random() * (array.length - 1));
    }

    init() {
        this.ready();
        this.putCommands();
        this.listenMessages();
        this.listenInteractions();
        this.login();
    }
}
