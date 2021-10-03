const { ticketMsger } = require('./general')

const generateChannels = async (guild, chans) => {

    const { ticketChan, lobbyChan, origin } = chans


    if (!lobbyChan) {
        await channelBuilder(guild, 'rf lobby', undefined, "GUILD_CATEGORY")
    }

    if (!ticketChan) {
        await channelBuilder(guild, "rf-ticket", origin.parent)
    }


}

const channelBuilder = async (guild, name, parent, type) => {

    await guild.channels.create(name, {
        type: type,
        parent: parent,

    }).then(async (_chat) => {
         if (name === "rf-ticket") {
            await ticketMsger(_chat);
            await _chat.send('esse canal pode ser movido para outra categoria, você deve deletar essa mensagem');
        }

    })

}

module.exports = {
    generateChannels,
}