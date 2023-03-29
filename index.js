const { ComponentType, ActivityType, Events, Collection, Client, GatewayIntentBits } = require('discord.js');
const { token, clientId, prefix } = require('./config.json');
const ytdl = require('ytdl-core');
const fs = require('node:fs');
const path = require('node:path');


// authenticates you with the discord API through
// environmental variables
console.log(prefix);

// Creating new gateway intents for the Discord class
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    game: {
        name: 'Sex with your mom',
        type: 'Streaming'
    },
    status: 'online',
});

// Insantiate your commands library while
// also listening for commands at the same time.
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Insantiate your createMessage library while
// also listening for messages at the same time
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix)) return; // Abort reading messages if the prefix doesn't exist

    // Channel filter 
    //let cachedChannel = client.channels.cache.get(channelId) = [];
    //for (var i = 1; i <= 15; i++) {
    //    cachedChannel.push(1);
    //};

    // Create a filter for the message prefix
    const filter = m => m.content.includes('978978749884289074');
    const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
    
    collector.on('collect', m => {
        console.log(`Collected ${m.content}`);
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });


    // If the sender is the bot, abort messaging
    if (message.author.bot) {
        console.log("We don't reply to ourselves");
        return;
    };


    // Listen to see if the user is wanting to change the prefix
    // Self Built
    if (message.content.startsWith(prefix + 'newPrefix')) {
        newHandler(message);
    };

    // Create the server music Queue
    // Built using online guide
    const queue = new Map();
    const serverQueue = queue.get(message.guild.id);
    console.log(serverQueue);

    if (!message.mentions.channels.first()) {
        let channelId = message.content.replace(/\D/g,'') // Channel Tagged ID set to channel
        const targetChannel = guild.channels.cache.find(channel => channel.name === channelId)
    }

    // Music Commands list
    // Built using online guide
    if (message.content.startsWith(botPrefix + 'play' || botPrefix + 'p')) {
        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith(botPrefix + 'play' + channel || botPrefix + 'p' + channel)) {
        execute(message, serverQueue);
        return message.channel.send("You're one funny fucker!\nI got you Bro.");
    } else if (message.content.startsWith(botPrefix + 'skip' || botPrefix + 's')) {
        skip(message, serverQueue);
        return;
    } else if (message.content.startsWith(botPrefix + 'stop' || botPrefix + 'X')) {
        stop(message, serverQueue);
        return;
    } else {
        message.channel.send("Sorry dumbass, that doesn't work!")
    };
});


// Listen for the specific Test event
const module = require('./module.json');
const item = module[Math.floor(Math.random() * quiz.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
);

interaction.reply({ 
    content: item.question, 
    fetchReply: true 
})
    .then(() => {
        interaction.channel.awaitMessages({ 
            filter, 
            max: 1, 
            time: 30000, 
            errors: [
                'time'
            ] 
        })
        .then(collected => {
            interaction.followUp(`${collected.first().author} got the correct answer!`);
        })
        .catch(collected => {
            interaction.followUp(`Looks like you're all dumbasses`);
        });
    });


// Listen for Event interactions. Specifically only
// the slash commands! Chat commands handled elsewhere
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found!`);
        return
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ 
                content: 'There was an error while executing this command!', 
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
});

function joinVcChannel(message, channel) {
    if (!voiceChannel) {
        const voiceChannel = message.member.voice.channel;
        let connection = userChannel.join();
    }
};

function newHandler(message) {
    let newPrefix = message.content.replace(prefix + 'newPrefix' + message, message);
    botPrefix = newPrefix;
    message.channel.send(`The prefix has been updated to ${botPrefix}`);
};


async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    if (!voiceChannel || !userChannel)
    return message.channel.send("That ain't gonna work champ...");
    
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("I'd join the voice channel but some dumbass didn't give me perms.");
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} was your choice? Lameeeee`);
    }
};

function logMentionChannels(message) {
    const channel = client.channels.cache.get(message.content.startsWith(prefix));
    let loggedChannel = channels.map(channel => new Object({
        'id': interaction.channel.id,
        'name': interaction.channel.name,
        'userid': message.author.id,
        'user': message.author.username,
        'message': message.content
    }));
};

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("You have to be in a voice channel to stop the music!");
    if (!serverQueue)
        return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
};

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("You have to be in a voice channel to stop the music!");
    if (!serverQueue)
        return message.channel.send("There is no song that I could stop!");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
};

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
};

if (typeof newPrefix !== undefined && typeof botPrefix !== undefined) {
    let botPrefix = prefix;
} else if (typeof newPrefix === undefined && typeof botPrefix !== undefined) {
    let botPrefix = botPrefix;
} else {
    let botPrefix = newPrefix;
};


// When client is ready, execute listen
client.once(Events.ClientReady, c => {
    console.log(`Ready! Bot session active as ${c.user.tag}`);
    console.log(`Your bot's prefix is ${prefix}`);
    console.log(`Your bot was insantiated with these options:`);
    console.log(client.options);
});

client.once('reconnecting', () => {
    console.log('Attempting to reconnect');
    console.log('Reconnecting . . .');
});

client.once('disconnect', () => {
    console.log('Disconnected!');
    console.log('If unintentional, please wait, disruption in service');
}); 


// Catch and log all interactions
client.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

// Login to discord as the bot
client.login(token);
