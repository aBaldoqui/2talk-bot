const { MessageEmbed } = require('discord.js')


const embedNewChat = new MessageEmbed()
    .setColor('#0xc5fb00')
    .setTitle('Looking for someone you can chat with...')
    .setDescription('type "exit" to close chat');

const connected = new MessageEmbed()
    .setColor('00FF00')
    .setTitle("You're now chatting with a random stranger.");

const joinedChat = new MessageEmbed()
    .setColor('00FF00')
    .setTitle("You're now chatting with a random stranger.")
    .setDescription('type "exit" to close chat');

const ticket = new MessageEmbed()
    .setColor('#ffff00')
    .setTitle('react with: 🎫 to create a ticket')
    .setDescription('talk to strangers')

const exitMsg = new MessageEmbed()
    .setColor('RED')
    .setTitle('disconecting')
    .setDescription('You have disconnected.')

const StrangerDisconnected= new MessageEmbed()
    .setColor('RED')
    .setTitle('disconecting')
    .setDescription('stranger has disconnected')

module.exports = {
    embedNewChat,
    connected,
    joinedChat,
    ticket,
    exitMsg,
    StrangerDisconnected
}