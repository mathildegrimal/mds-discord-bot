const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Replies with random number!")
        .addNumberOption((option) => option.setName("min").setDescription("Enter a number").setRequired(true))
        .addNumberOption((option) => option.setName("max").setDescription("Enter a number").setRequired(true)),
    async execute(interaction) {
        console.log(interaction);
        await interaction.reply("Coucou!");
    },
};
//# sourceMappingURL=ping.js.map