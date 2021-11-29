const embedMessages = require('./embedMsgs')
const { exitMsg } = require('./embedMsgs')

const ticketMsger = async (ticketChan) => {
    try{
        await ticketChan.bulkDelete(100, true);//more than 100
        const _msg = await ticketChan.send({ embeds: [embedMessages.ticket] });
        await _msg.react('🎫')
    }catch(err){
        console.log(err)
    }
    
}

const msgManager = async (msg) => {
    await msgSender(msg, `Stranger: ${msg.content}`)
}

const inativeChat = async (chan) => {

    setTimeout(async () => {
        try {
            await chan.messages.fetch({ limit: 1 }).then(async lastMessage => {
                if (!lastMessage.first()) {
                    await chan.delete()
                } else if (Date.now() - lastMessage.first().createdAt > 2000 * 60) {
                    try {
                        await chan.delete()
                    } catch (err) {
                        console.log(err)
                    }

                }
                else inativeChat(chan)

            })
        } catch { }
    }, 4000 * 60)

}



const exit = async (msg) => {
    await msg.channel.send({ embeds: [exitMsg] })

    await msgSender(msg, embedMessages.StrangerDisconnected)

    await msg.channel.permissionOverwrites.set([
        {
            id: msg.channel.guild.roles.everyone,
            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
        },
    ])

    setTimeout(async function () {
        try {
            await msg.channel.delete()
        } catch (err) {
            console.log('alredy deleted')
        }
    }, 120000); //2min
}

async function msgSender(msg, content) {
    try {
        if (content.type){
            await msg.channel.guild.channels.cache.find(channel => channel.name === msg.channel.topic).send({embeds: [content]});
        }
        await msg.channel.guild.channels.cache.find(channel => channel.name === msg.channel.topic).send(content);
    } catch (err) {
        console.log(`error sending :${msg, content}`)
    }
}

module.exports = {
    ticketMsger,
    exit,
    msgManager,
    inativeChat,
}
