const {messageHandler, reactionHandler, innit} = require('./handlers/index.js');
const {Client, Intents} = require('discord.js');
require('dotenv').config()


let token = process.env.TOKEN;
if(!token) token = "ODc4NzEyNzE1ODM5OTQ2ODIy.YSFK_Q.QZrZ81GILfRe_gmuqvcRPzxCVt4"
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });

try{
    client.once('ready', innit);

    client.on('messageReactionAdd', reactionHandler)
    
    client.on('messageCreate', messageHandler)
    
    client.login(token);
}catch(err){
    console.log(err)
}
