const fs = require('fs');
export function getCommands() {
    const commands = [];
    const commandFiles = fs
        .readdirSync('./commands')
        .filter((file) => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        console.log("data",command.data);
        commands.push(command.data.toJSON());
    }
    return commands;
}
