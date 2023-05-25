const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
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

client.on("messageCreate", async (message) => {
  const splittedMessages = message.content.split(" ");
  if (splittedMessages[0] === "bly") {
    console.log("recognized");
    const command = splittedMessages[1];
    const arg = splittedMessages.slice(2);
    if (command === "game") {
      shopfunction(message);
    }
  }
});

// client.on("messageCreate", async (message) => {
//   console.log("123");
//   const messageContent = message.content.split(" ");

//   if (messageContent[0] === "ssco") {
//     const command = messageContent[1];
//     const args = messageContent.slice(2);

//     if (command === "admin") {
//       const row = new Discord.MessageActionRow().addComponents(
//         new Discord.MessageButton()
//           .setCustomId("startQuizRandom")
//           .setLabel("Start Quiz (Random)")
//           .setStyle("PRIMARY"),
//         new Discord.MessageButton()
//           .setCustomId("endQuiz")
//           .setLabel("End Quiz")
//           .setStyle("DANGER"),
//         new Discord.MessageButton()
//           .setCustomId("addQuiz")
//           .setLabel("Add Quiz")
//           .setStyle("PRIMARY")
//       );

//       const embed = new Discord.MessageEmbed()
//         .setTitle("Admin commands")
//         .setDescription("Click a button to execute a command.");

//       message.reply({ embeds: [embed], components: [row], ephemeral: true });
//     } else if (command === "quizmaster") {
//       setQuizMaster.execute(message, args);
//     } else {
//       const embed = new Discord.MessageEmbed()
//         .setColor("#ff0000")
//         .setTitle("Unknown command")
//         .setDescription("Please check the command and try again.");
//       message.reply({ embeds: [embed] });
//     }
//   }
// });

client.login(token);
