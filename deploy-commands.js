const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { dev_server, token, clientId } = require('./config.json');


const commands = [];
// Grab all the command filels from the commands dirctory
const commandsPath = path.join(__dirname, 'commands', 'core');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data
for (const file of commandFiles) {
    const command = require(`./commands/core/${file}`)
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, dev_server),
			{ body: commands },
        );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
