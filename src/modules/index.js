const {newTicket} = require('./queue')
const embedMessages = require('./embedMsgs')
const {exit, msgManager, ticketMsger, inativeChat} = require('./general')
const {generateChannels} = require('./generateChannels')
const {botBoot} = require('./botBoot')

module.exports = {
    inativeChat,
    exit,
    newTicket,
    embedMessages,
    generateChannels,    
    botBoot,
    msgManager,
    ticketMsger,
}