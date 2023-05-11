const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.login(BOT_TOKEN);
