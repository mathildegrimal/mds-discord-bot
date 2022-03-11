"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
exports.default = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Replies with the list of commands you can execute!'),
    async execute(interaction) {
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Voici la liste des intéractions que tu peux avoir avec MyWonderfulBot')
            .setAuthor({
            name: 'Mathilde',
        })
            .setDescription('Tape ta commande sans oublier les paramètres quand il y en a')
            .addFields({ name: '/meteo', value: 'pour avoir la météo du jour à Montpellier' }, { name: '/random', value: 'pour avoir un chiffre random. Il faudra entrer le min et le max' }, {
            name: 'Dis "bonjour" au Bot (langue au choix entre plusieurs)',
            value: 'Il te répondra',
        }, { name: '@MyWonderfulBot', value: 'Mentionne @MyWonderfulBot et il te répondra pour proposer son aide' });
        await interaction.reply({
            content: 'Voici le lien !',
            embeds: [embed],
        });
    },
};
//# sourceMappingURL=button%20copy.js.map