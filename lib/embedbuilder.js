const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const newEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(passedTitle)
	.setURL(passedUrl)
	.setAuthor({ 
        name: passedName, 
        iconURL: passedIcon, 
        url: passedUrl 
    })
	.setDescription(passedDescription)
	.setThumbnail(passedThumbnail)
	.addFields(
		{ 
            name: passedFieldOneTitle, 
            value: passedFieldOneValue 
        },
		{ 
            name: '\u200B', 
            value: '\u200B' 
        },
		{ 
            name: passedFieldTwoTitle, 
            value: passedFieldTwoValue, 
            inline: true 
        },
		{ 
            name: passedFieldThreeTitle, 
            value: passedFieldThreeValue, 
            inline: true 
        },
	)
	.addFields({ 
        name: passedFieldFourTitle, 
        value: passedFieldFiveTitle, 
        inline: true 
    })
	.setImage(passedSetImage)
	.setTimestamp()
	.setFooter({ 
        text: passedFooterText, 
        iconURL: passedFooterIcon 
    });

channel.send({ embeds: [exampleEmbed] });
