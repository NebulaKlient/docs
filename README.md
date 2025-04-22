# Discord Bookmark Bot

A simple Discord bot using discord.js that allows users to bookmark messages using a Message Context Menu command.

## Setup

1.  **Clone/Download:** Get the bot files.
2.  **Install Dependencies:** Run `npm install` in the project directory.
3.  **Configure:** 
    *   Create a `.env` file in the root directory (or rename the example).
    *   Fill in your `DISCORD_TOKEN`, `BOOKMARK_CHANNEL_ID`, and `CLIENT_ID`.
    *   You can get your Bot Token and Client ID from the [Discord Developer Portal](https://discord.com/developers/applications).
    *   To get a Channel ID, enable Developer Mode in Discord (User Settings > Advanced > Developer Mode), then right-click the desired channel and select "Copy Channel ID".
4.  **Register Commands:** Run `npm run deploy`. This only needs to be done once or when you change the command definitions.
5.  **Run the Bot:** Run `npm start`.

## Usage

1.  Invite the bot to your server(s).
2.  Right-click on any message in a server where the bot is present.
3.  Select "Apps" > "Bookmark Message".
4.  A link to the message will be posted in the channel specified by `BOOKMARK_CHANNEL_ID`.

## Permissions Required

When inviting the bot, ensure it has the necessary permissions:
*   `Send Messages` (in the bookmark channel)
*   `Read Message History` (implicitly granted by being in servers)
*   The `applications.commands` scope must be enabled during the OAuth2 invite process.
