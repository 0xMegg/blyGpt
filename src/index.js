const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  ComponentType,
} = require("discord.js");
const { token } = require("./config");
const shopfunction = require("./functions/shopfunction.js");

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

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
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
  // const collector = interaction.channel.createMessageComponentCollector({
  //   componentType: ComponentType.Button,
  //   // time: 60000,
  // });
  // collector.on("collect", async (i) => {
  //   console.log(i.customId);
  //   if (i.customId === "item1") {
  //     interaction.channel.send("fuckyou");
  //     return;
  //   }
  // });
  // collector.on("end", (collected) => {
  //   console.log(`Collected ${collected.size} interactions.`);
  // });

  const splittedMessages = interaction.content.split(" ");
  if (splittedMessages[0] === "bly") {
    const command = splittedMessages[1];
    const arg = splittedMessages.slice(2);
    if (command === "game") {
      shopfunction(interaction);
    }
  }
});

client.login(token);
