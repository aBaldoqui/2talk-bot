const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()

const clientId = process.env.CLIENTID;
const guildId = process.env.DEVGUILDID;
const  token = process.env.TOKEN;

const commands = [
    new SlashCommandBuilder().setName('setup').setDescription('setup channel structure'),
    new SlashCommandBuilder().setName('config').setDescription('Change settings'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);