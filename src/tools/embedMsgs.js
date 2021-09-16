const { MessageEmbed } = require('discord.js')


const embedNewChat = new MessageEmbed()
    .setColor('#0xc5fb00')
    .setTitle('esperando uma segunda pessoa conectar...')
    .setDescription('digite: "sair" para fechar este chat');

const connected = new MessageEmbed()
    .setColor('00FF00')
    .setTitle('uma segunda pessoa se conectou, mande um oi');

const joinedChat = new MessageEmbed()
    .setColor('00FF00')
    .setTitle('você esta conectado com outra pessoa, mande um oi')
    .setDescription('digite: "sair" para fechar este chat');

const ticket = new MessageEmbed()
    .setColor('#ffff00')
    .setTitle('pegue seu ticket aqui')
    .setDescription('converse com estranhos')

const chatMessage = new MessageEmbed()
    .setTitle('pessoa:')

const exitMsg = new MessageEmbed()
    .setColor('RED')
    .setTitle('chat finalizado')
    .setDescription('saindo do chat...')

module.exports = {
    embedNewChat,
    connected,
    joinedChat,
    ticket,
    chatMessage,
    exitMsg
}