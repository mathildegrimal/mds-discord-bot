const { SlashCommandBuilder } = require('@discordjs/builders');

export default {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Replies with random number!')
    .addNumberOption((option) =>
        option.setName('min').setDescription('Enter a number').setRequired(true)
    )
    .addNumberOption((option) =>
        option.setName('max').setDescription('Enter a number').setRequired(true)
    ),
  async execute(interaction) {
    const max = interaction.options.getNumber('min');
    const min = interaction.options.getNumber('max');
    const random = Math.floor(Math.random() * (max - min) + min);
    await interaction.reply(
      `Voilà ton nombre random : ${random}. Fais-en bon usage !`
    );
  }
};
