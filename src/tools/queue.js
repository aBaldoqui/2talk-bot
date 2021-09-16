const { Message } = require('discord.js')
const embedsMSGS = require('./embedMsgs')

let isLocked = null;

let fifo = []

const queue = {
    isAwaiting: false,
    first: "",
    second: "",
}


const newTicket = async (reaction, usr) => {
    await reaction.users.remove(usr.id)

    fifo.push(usr.id)

    await worker()

    async function worker() {
        if (isLocked) return
        isLocked = true;
        _id = fifo[0];

        if (queue.isAwaiting) {
            queue.isAwaiting = false;
            if (await reaction.message.channel.guild.channels.cache.find(channel => channel.name === queue.second)) {
                await reaction.message.channel.guild.channels.cache.find(channel => channel.name === queue.second).permissionOverwrites.set([
                    {
                        id: reaction.message.channel.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                    },
                    {
                        id: _id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                    }]).then(async _chat => {
                        await _chat.send({ content: `${usr}, chat criado`, embeds: [embedsMSGS.joinedChat]})
                        try {
                            await _chat.guild.channels.cache.find(channel => channel.name === _chat.topic).send({ embeds: [embedsMSGS.connected] });
                        } catch {

                        }
                    })

                isLocked = false;
                fifo.shift()
            } else {
                isLocked = false;
                fifo.shift()
            }
        } else {
            queue.isAwaiting = true;
            queue.first = Math.floor(Math.random() * 16777215).toString(16);
            queue.second = Math.floor(Math.random() * 16777215).toString(16);

            const guld = reaction.message.channel.guild;
            await createChannel(guld, usr).then();
        }



        if (fifo[0]) {
            await worker();
        }
    }
}

async function createChannel(guld, usr) {
    await guld.channels.create(queue.first, {
        type: "GUILD_TEXT",
        topic: queue.second,
        parent: await guld.channels.cache.find(a => a.name === "salas"),
        permissionOverwrites: [
            {
                id: guld.roles.everyone,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
            {
                id: usr.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            }
        ],
    }).then((_chat) => {
        _chat.send({content: `${usr}, chat criado`, embeds: [embedsMSGS.embedNewChat]})
    })

    await guld.channels.create(queue.second, {
        type: "GUILD_TEXT",
        topic: queue.first,
        parent: guld.channels.cache.find(a => a.name === "salas"),
        permissionOverwrites: [
            {
                id: guld.roles.everyone,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
        ],
    }).then(() => {
        isLocked = false;
        fifo.shift()
    })
}


module.exports = {
    newTicket
}