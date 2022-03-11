
import {
    MessageActionRow,
    MessageButton,
    CommandInteraction,
} from 'discord.js';
import  { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName('meteo')
        .setDescription('Replies with a link to daily weather in Montpellier!'),
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Consulte ici la météo de montpellier')
                .setStyle('LINK')
                .setURL(
                    'https://www.lachainemeteo.com/meteo-france/ville-963/previsions-meteo-montpellier-aujourdhui'
                )
        );

        await interaction.reply({
            content: 'Voici le lien !',
            components: [row],
        });
    },
};