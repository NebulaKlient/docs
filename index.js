import { Client, GatewayIntentBits, Events, InteractionType, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; 

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const bookmarkChannelId = process.env.BOOKMARK_CHANNEL_ID;

if (!token || !bookmarkChannelId) {
    console.error('Error: DISCORD_TOKEN or BOOKMARK_CHANNEL_ID is missing in .env file.');
    process.exit(1);
}

const streamableRegex = /https?:\/\/streamable\.com\/([a-zA-Z0-9]+)/;

// Formatter for CET timestamp (Re-added)
const cetFormatter = new Intl.DateTimeFormat('en-GB', { 
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: 'Europe/Berlin' // Represents CET/CEST
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.MessageContent // Add if you want to include message content previews
    ]
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isMessageContextMenuCommand() || interaction.commandName !== 'Bookmark Message') return;

	try {
        const targetMessage = interaction.targetMessage;

        const bookmarkChannel = await client.channels.fetch(bookmarkChannelId);

        if (!bookmarkChannel || !bookmarkChannel.isTextBased()) {
            console.error(`Bookmark channel (${bookmarkChannelId}) not found or is not a text channel.`);
            await interaction.reply({ content: 'Error: Could not find the bookmark channel.', ephemeral: true });
            return;
        }

        let streamableDownloadUrl = null;
        const messageContent = targetMessage.content;
        const streamableMatch = messageContent?.match(streamableRegex);

        if (streamableMatch && streamableMatch[1]) {
            const shortcode = streamableMatch[1]; 
            const streamableApiUrl = `https://api.streamable.com/videos/${shortcode}`;
            console.log(`Found Streamable link, querying API: ${streamableApiUrl}`);
            try {
                const streamableResponse = await fetch(streamableApiUrl, {
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (streamableResponse.ok) {
                    const streamableData = await streamableResponse.json();
                    if (streamableData && streamableData.files && streamableData.files.mp4 && streamableData.files.mp4.url) {
                        streamableDownloadUrl = streamableData.files.mp4.url.startsWith('//')
                            ? `https:${streamableData.files.mp4.url}`
                            : streamableData.files.mp4.url;
                        console.log(`Streamable API success: ${streamableDownloadUrl}`);
                    } else {
                        console.warn('Streamable API response missing expected file URL:', streamableData);
                    }
                } else {
                    const errorText = await streamableResponse.text();
                    console.error(`Streamable API request failed with status: ${streamableResponse.status}. Response: ${errorText}`);
                }
            } catch (fetchError) {
                console.error('Error calling Streamable API:', fetchError);
            }
        }

        // Generate Random Color
        const randomColor = Math.floor(Math.random()*16777215); // Generate random integer up to FFFFFF

        // Format timestamp (Re-added)
        const formattedTimestamp = cetFormatter.format(targetMessage.createdAt);

        const bookmarkEmbed = new EmbedBuilder()
            .setColor(randomColor) // Use random color
            .setAuthor({ name: targetMessage.author.tag, iconURL: targetMessage.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**[Jump to Message](${targetMessage.url})** in <#${targetMessage.channelId}>

${targetMessage.content ? `> ${targetMessage.content.substring(0, 1000)}` : '*Message content not available or empty.*'}`)
            .addFields(
                { name: 'Bookmarked By', value: `${interaction.user.tag} (${interaction.user.id})` },
                { name: 'Original Post Time (CET)', value: formattedTimestamp } // Add formatted CET time
            )
            // Removed .setTimestamp()
            .setFooter({ text: `Server: ${interaction.guild?.name ?? 'Unknown Server'}` });

        if (streamableDownloadUrl) {
            bookmarkEmbed.addFields({ name: 'Streamable Download (Temporary)', value: `[Click to Download Video](${streamableDownloadUrl})` });
        }

        // --- Handle Attachments (Image and Video) ---
        let imageSet = false; // Flag to ensure we only set one image via setImage
        if (targetMessage.attachments.size > 0) {
            for (const [id, attachment] of targetMessage.attachments) {
                // Prioritize setting embed image if it's an image file
                if (!imageSet && attachment.contentType?.startsWith('image/')) {
                     bookmarkEmbed.setImage(attachment.url);
                     imageSet = true; // Only set the first image found
                }
                // Add a link field if it's a video file
                else if (attachment.contentType?.startsWith('video/')) {
                     bookmarkEmbed.addFields({ name: 'Attached Video', value: `[Click to View/Download Video](${attachment.url})` });
                }
                // Potentially add links for other file types too?
                // else if (!attachment.contentType?.startsWith('image/')) { 
                //      bookmarkEmbed.addFields({ name: `Attached File (${attachment.name})`, value: `[Link](${attachment.url})` });
                // }
            }
        }
        // --- End Attachment Handling ---

        await bookmarkChannel.send({ embeds: [bookmarkEmbed] });

        await interaction.reply({ content: 'Message successfully bookmarked!', ephemeral: true });

    } catch (error) {
		console.error('Error handling bookmark interaction:', error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);
