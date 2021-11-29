const { ticketMsger, inativeChat } = require('./general')

const botBoot = async (client) => {


    await client.guilds.cache.map(async (guilds) => {
        const foo = await guilds.fetchAuditLogs({ type: "CHANNEL_CREATE" })
        foo.entries.map(async (a) => {

            if (a.reason === "server created by Random Phone bot, to create new tickets") {
                const chan = await guilds.channels.cache.get(a.target.id)
                if (chan) {
                    await ticketMsger(chan)
                } else {
                    console.log(`sem canal de ticket em ${guilds.name}`)
                }
            }

            if (a.reason === "server created by Random Phone bot, to host channels") {
                const chan = await guilds.channels.cache.get(a.target.id)
                if (chan) {
                    inativeChat(chan)
                } else {
                    console.log(chan)
                    console.log(`sem canal de ticket em ${guilds.name}`)
                }
            }
        })
    })
}



module.exports = {
    botBoot,
}