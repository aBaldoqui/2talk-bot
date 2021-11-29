const { newTicket, exit, generateChannels, botBoot, msgManager } = require('../modules/index')
require('dotenv').config()

let botId = ""
if (process.env.BOTID) {
    botId = process.env.BOTID
} else {
    botId = "878712715839946822"
}

const innit = async (client) => {
    try {
        await botBoot(client)
    } catch (err) {
        console.log(err)
    }

    console.log(`serving ${client.guilds.cache.size} servers as ${client.user.username}`)
}

const reactionHandler = async (reaction, usr) => {
    if (usr.bot || usr.system) return;
    if (reaction.message.author.id !== botId || reaction.message.embeds[0].title !== 'react with: 🎫 to create a ticket') return;
    
    await newTicket(reaction, usr);
}

const messageHandler = async (msg) => {
    if (msg.author.bot) return;

    const { content } = msg;

    const lobby = await msg.channel.guild.channels.cache.find(channel => channel.name === "rp lobby")

    if (!lobby) return;

    if (content === "clear") {
        if (msg.author.id !== "376165182126161931" && msg.author.id !== "840005128744075284") return;
        await msg.delete()
        await lobby.guild.channels.cache.map(async (a) => {
            if (a.parentId == lobby.id) await a.delete()
        })
        return
    };

    if (msg.channel.parentId !== lobby.id) return;
    if (msg.channel.type !== 'GUILD_TEXT') return;

    const msgLowerCase = msg.content.toLowerCase();

    if (msgLowerCase === "sair" || msgLowerCase === "exit") {
        await exit(msg);
        return
    }

    if (msg.content === "") return;

    try {
        await msgManager(msg);
    } catch (err) {
    }
}

const interactionHandler = async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, guild, channel } = interaction;

    if (commandName === 'setup') {

        const ticketChan = await findChannel(guild, "rp-ticket")
        const lobbyChan = await findChannel(guild, "rp lobby")

        if (ticketChan && lobbyChan) {
            await interaction.reply(`alredy seted ${ticketChan} and lobby`);
            return
        }

        try {
            await generateChannels(guild, { ticketChan, lobbyChan, origin: channel }).then(async () => {
                await interaction.reply(`creating channels`);
            })
        } catch (err) {
            await interaction.reply(`unexpected error`);
        }
    }
}

async function findChannel(guild, name) {
    const chan = await guild.channels.cache.find(channel => channel.name === name);
    return chan
}


module.exports = {
    messageHandler,
    reactionHandler,
    innit,
    interactionHandler
}
