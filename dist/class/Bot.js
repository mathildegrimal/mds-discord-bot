"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
require('dotenv').config();
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const { Client, Intents } = require('discord.js');
const fs_1 = __importDefault(require("fs"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const messages_1 = require("../config/messages");
const deploy_commands_1 = require("../utils/deploy-commands");
class Bot {
    constructor() {
        this.client = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        });
        this.client.commands = new discord_js_1.Collection();
        const commandFiles = fs_1.default
            .readdirSync(path_1.default.join(__dirname, '../commands'))
            .filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path_1.default.join(__dirname, '../commands', file)).default;
            this.client.commands.set(command.data.name, command);
        }
    }
    ready() {
        this.client.once('ready', () => {
            console.log(`logged in as ${this.client.user.tag}`);
        });
    }
    putCommands() {
        const rest = new rest_1.REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
        const commands = (0, deploy_commands_1.getCommands)();
        rest.put(v9_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    }
    listenMessages() {
        this.client.on('messageCreate', async (message) => {
            const { content, channel } = message;
            if (content.includes(this.client.user.id)) {
                const messageContent = content.split(`<@!${this.client.user.id}> `)[1];
                if (messageContent) {
                    //to remove special chars if user send hello with ! or another special char
                    const specialChars = /[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                    if (messages_1.helloKeywords.includes(messageContent.split(specialChars)[0].toLowerCase())) {
                        //reply when user says "hello" or other hello keyword
                        const messageToSend = `${messages_1.hellos[this.getRandom(messages_1.hellos)]} ${message.author.username} ! ${messages_1.howAreYou[this.getRandom(messages_1.howAreYou)]} ?`;
                        channel.send(messageToSend);
                    }
                    else {
                        //reply when  mention of the bot by the user in message
                        channel.send(messages_1.mentions[this.getRandom(messages_1.mentions)]);
                    }
                }
                else {
                    //reply when  mention of the bot by the user (whithout message)
                    channel.send(messages_1.mentions[this.getRandom(messages_1.mentions)]);
                }
            }
        });
    }
    listenInteractions() {
        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand())
                return;
            const command = this.client.commands.get(interaction.commandName);
            if (!command)
                return;
            try {
                await command.execute(interaction);
            }
            catch (error) {
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
    getRandom(array) {
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
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map