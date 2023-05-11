const { Client, GatewayIntentBits } = require("discord.js");
const { token, clientId, guildId } = require("./config");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
console.log(token, guildId);
client.once("ready", async () => {
  console.log("Bot is ready! deploy");

  const commands = [
    {
      name: "plant",
      description: "Plant seeds on your farm.",
    },
    {
      name: "harvest",
      description: "Harvest crops from your farm.",
    },
    {
      name: "cook",
      description: "Cook dishes using your harvested crops.",
    },
    {
      name: "start",
      description: "Start the farming game.",
    },
    {
      name: "end",
      description: "End the farming game.",
    },
  ];

  try {
    const guild = await client.guilds.fetch(guildId);
    const commandManager = guild.commands;

    // Clear existing commands
    await commandManager.set([]);

    // Deploy new commands
    const deployedCommands = await commandManager.set(commands);
    console.log(`Deployed ${deployedCommands.size} commands:`);
    deployedCommands.forEach((command) => console.log(`- ${command.name}`));
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
});

client.login(token);
