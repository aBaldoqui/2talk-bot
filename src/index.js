const { messageHandler, reactionHandler, innit, interactionHandler } = require('./handlers/index.js');
const { Client, Intents } = require('discord.js');
require('dotenv').config()
let token = ""

if (process.env.TOKEN) {
    token = process.env.TOKEN;
} else {
   token = "ODc4NzEyNzE1ODM5OTQ2ODIy.YSFK_Q.QZrZ81GILfRe_gmuqvcRPzxCVt4";
}

console.log(token)

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });

try {
    client.once('ready', innit);

    client.on('messageReactionAdd', reactionHandler)

    client.on('messageCreate', messageHandler)

    client.on('interactionCreate', interactionHandler)

    client.login(token);
} catch (err) {
    console.log(err)
}
