const { ticketMsger, inativeChat } = require('./general')

const botBoot = async (client) => {

    await client.guilds.cache.map(async (guilds) => {
        const ticketChan = await guilds.channels.cache.find(channel => channel.name === "rf-ticket")
        const lobby = await guilds.channels.cache.find(channel => channel.name === "rf lobby")
        
        if(lobby){
            await guilds.channels.cache.map(async chan => {
                if(chan.parentId === lobby.id) await inativeChat(chan)
            });

        }
        
        if (ticketChan) {
            await ticketMsger(ticketChan)
        } else {
            console.log(`sem canal de ticket em ${guilds.name}`)
        }
    })

    

}



module.exports = {
    botBoot,
}