const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  ComponentType,
} = require("discord.js");
const { token } = require("./config.js");
const mainfunction = require("./functions/mainfunction.js");
const startfunction = require("./functions/startfunction.js");
const endfunction = require("./functions/endfunction.js");
const helpfunction = require("./functions/helpfunction.js");
const getTime = require("./services/utility");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// client.commands = new Collection();
// const commandsPath = path.join(__dirname, "commands");
// const commandFiles = fs
//   .readdirSync(commandsPath)
//   .filter((file) => file.endsWith(".js"));

// for (const file of commandFiles) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   // Set a new item in the Collection
//   // With the key as the command name and the value as the exported module
//   client.commands.set(command.data.name, command);
// }

client.once("ready", async () => {
  console.log(`${getTime()}Ready!`);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (interaction) => {
  const splittedMessages = interaction.content.split(" ");
  if (splittedMessages[0] === "bly") {
    const command = splittedMessages[1];
    // const arg = splittedMessages.slice(2);
    if (command === "game") {
      mainfunction(interaction);
      // } else if (command === "start") {
      //   startfunction(interaction);
      // } else if (command === "end") {
      //   endfunction(interaction);
    } else {
      helpfunction(interaction);
    }
  }
});

client.login(token);
