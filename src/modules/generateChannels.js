const { ticketMsger } = require('./general')

const generateChannels = async (guild, chans) => {

    const { ticketChan, lobbyChan, origin } = chans


    if (!lobbyChan) {
        await channelBuilder(guild, 'rp lobby', undefined, "GUILD_CATEGORY")
    }

    if (!ticketChan) {
        await channelBuilder(guild, "rp-ticket", origin.parent)
    }


}

const channelBuilder = async (guild, name, parent, type) => {

    await guild.channels.create(name, {
        type: type,
        parent: parent,

    }).then(async (_chat) => {
         if (name === "rp-ticket") {
            await ticketMsger(_chat);
            await _chat.send('this channel can be moved to another category, you should delete this message');
        }

    })

}

module.exports = {
    generateChannels,
}