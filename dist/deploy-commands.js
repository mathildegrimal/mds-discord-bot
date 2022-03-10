"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommands = void 0;
const fs = require('fs');
function getCommands() {
    const commands = [];
    const commandFiles = fs
        .readdirSync('./commands')
        .filter((file) => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        console.log("data", command.data);
        commands.push(command.data.toJSON());
    }
    return commands;
}
exports.getCommands = getCommands;
//# sourceMappingURL=deploy-commands.js.map