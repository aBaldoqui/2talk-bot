console.log('sim')

const {messageHandler, reactionHandler, innit} = require('./handlers/index.js');
const {Client, Intents} = require('discord.js');

require('dotenv').config()

const token = "ODc4NzEyNzE1ODM5OTQ2ODIy.YSFK_Q.FmFQQLxVfPubA1-iqsVqdH4K7Pk";
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });

console.log('vamo bora')

try{
    client.once('ready', innit);

    client.on('messageReactionAdd', reactionHandler)
    
    client.on('messageCreate', messageHandler)
    
    client.login(token);
}catch(err){
    console.log(err)
}
