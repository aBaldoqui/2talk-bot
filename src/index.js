const {messageHandler, reactionHandler, innit} = require('./handlers/index.js');
const {Client, Intents} = require('discord.js');

require('dotenv').config()

const token = process.env.TOKEN;
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });


client.once('ready', innit);

client.on('messageReactionAdd', reactionHandler)

client.on('messageCreate', messageHandler)

client.login(token);
