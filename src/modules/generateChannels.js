const { ticketMsger } = require('./general')

const generateChannels = async (guild, chans) => {

    const { ticketChan, lobbyChan, origin } = chans


    if (!lobbyChan) {
        await channelBuilder(guild, 'rp lobby', undefined, "GUILD_CATEGORY", "to host channels")
    }

    if (!ticketChan) {
        await channelBuilder(guild, "rp-ticket", origin.parent, "GUILD_TEXT", "to create new tickets")
    }


}

const channelBuilder = async (guild, name, parent, type, reason) => {

    await guild.channels.create(name, {
        type: type,
        parent: parent,
        reason: `server created by Random Phone bot, ${reason}`

    }).then(async (_chat) => {
         if (name === "rp-ticket") {
            await ticketMsger(_chat);
            await _chat.send('this channel can be moved to another category, you can change this name, you should delete this message');
        }

    })

}

module.exports = {
    generateChannels,
}