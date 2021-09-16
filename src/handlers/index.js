const { Message } = require('discord.js')

const {newTicket, embedMessages} =require('../tools/index')

require('dotenv').config()



const innit = async (client) => {
    await client.guilds.cache.map(async (a) => {
        const chan = a.channels.cache.find(channel => channel.name === "ticket")
        if (chan) {
            await chan.bulkDelete(100);//more than 100
            const _msg = await chan.send({embeds:[embedMessages.ticket]});
            _msg.react('🎫')
        } else {
            console.log(`sem canal de ticket em ${a.name}`)
        }
    })

    console.log('pronto')
    console.log(`serving ${client.guilds.cache.size} servers`)
}



const reactionHandler = async (reaction, usr) => {
    if (usr.bot || usr.system) return;
    if (reaction.message.author.id !== '878712715839946822' || reaction.message.embeds[0].title !== 'pegue seu ticket aqui') return;
    await newTicket(reaction,usr);
}

const messageHandler = async (msg) => {
    if (msg.author.bot) return;
    const lobby = await msg.channel.guild.channels.cache.find(channel => channel.name === "salas")

    if (msg.content === "clear") {
        if(msg.author.id !== "376165182126161931" && msg.author.id !== "840005128744075284") return;
        await msg.delete()
        await lobby.guild.channels.cache.map(async (a) => {
            if (a.parentId == lobby.id) await a.delete()
        })
    };

    if (msg.channel.parentId !== lobby.id) return;
    if (msg.channel.type !== 'GUILD_TEXT') return;

    if (msg.content === "") return;

    try {
        await msg.channel.guild.channels.cache.find(channel => channel.name === msg.channel.topic).send(msg.content);
    } catch {
        msg.channel.send('um erro inesperado aconteceu')
    }
}


module.exports = {
    messageHandler,
    reactionHandler,
    innit
}
