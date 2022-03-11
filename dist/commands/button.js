"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
exports.default = {
    data: new SlashCommandBuilder()
        .setName('meteo')
        .setDescription('Replies with a link to daily weather in Montpellier!'),
    async execute(interaction) {
        const row = new MessageActionRow().addComponents(new MessageButton()
            .setLabel('Consulter la météo')
            .setStyle('LINK')
            .setURL('https://www.lachainemeteo.com/meteo-france/ville-963/previsions-meteo-montpellier-aujourdhui'));
        await interaction.reply({
            content: 'Voici le lien !',
            components: [row],
        });
    },
};
//# sourceMappingURL=button.js.map