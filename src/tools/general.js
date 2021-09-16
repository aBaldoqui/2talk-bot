const { Message } = require('discord.js');

const {exitMsg} = require('./embedMsgs')

const exit = async (msg)=>{
    await msg.channel.send({ embeds: [exitMsg] })

    await msg.channel.permissionOverwrites.set([
        {
            id: msg.channel.guild.roles.everyone,
            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
        },
        {
            id: msg.author.id,
            deny: ['SEND_MESSAGES'],
        }
    ])

    setTimeout(async function () {
        await msg.channel.permissionOverwrites.set([
            {
                id: msg.channel.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
                id: msg.author.id,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            }])
    }, 3000);
}

module.exports = {
    exit,
}