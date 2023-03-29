const filter = m => m.content.includes('978978749884289074');
    const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

    collector.on('collect', m => {
        console.log(`Collected ${m.content}`);
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });
