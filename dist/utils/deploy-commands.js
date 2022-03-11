"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommands = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function getCommands() {
    const commands = [];
    const commandFiles = fs_1.default
        .readdirSync(path_1.default.join(__dirname, '../commands'))
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path_1.default.join(__dirname, '../commands', file)).default;
        commands.push(command.data.toJSON());
    }
    return commands;
}
exports.getCommands = getCommands;
//# sourceMappingURL=deploy-commands.js.map