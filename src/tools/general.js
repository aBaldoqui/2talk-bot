const { Message } = require('discord.js');

const {exitMsg} = require('./embedMsgs')

const exit = async (msg)=>{
    await msg.channel.send({embeds: [exitMsg]})

    await msg.channel.permissionOverwrites.set([
    {
        id : msg.author.id,
        deny: ['SEND_MESSAGES'],
    }])

    setTimeout(function(){ 
        msg.channel.permissionOverwrites.set([
            {
                id : msg.author.id,
                deny: ['VIEW_CHANNEL'],
            }])
    }, 3000);
}

module.exports = {
    exit,
}