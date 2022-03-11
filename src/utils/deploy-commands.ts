import path from "path";

const fs = require('fs');
export function getCommands() {
    const commands = [];
    const commandFiles = fs
        .readdirSync(path.join(__dirname, '../commands'))
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, '../commands', file)).default;
        commands.push(command.data.toJSON());
    }
    return commands;
}
