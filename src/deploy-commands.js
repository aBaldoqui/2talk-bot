const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()

const clientId = "878712715839946822";
const guildId = "878723117361532989";
const  token = "ODc4NzEyNzE1ODM5OTQ2ODIy.YSFK_Q.QZrZ81GILfRe_gmuqvcRPzxCVt4";

const commands = [
    new SlashCommandBuilder().setName('setup').setDescription('setup channel structure'),
    new SlashCommandBuilder().setName('config').setDescription('Change settings'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);