const {newTicket} = require('./queue')
const embedMessages = require('./embedMsgs')
const {exit} = require('./general')


module.exports = {
    exit,
    newTicket,
    embedMessages
}