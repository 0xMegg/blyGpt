// const { Client, Collection } = require('discord.js');
// const fs = require('fs');
// const path = require('path');
// const config = require('./config');

// module.exports = class BotClient extends Client {
//   constructor() {
//     super();
//     this.commands = new Collection();
//   }

//   loadCommands() {
//     const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'));

//     for (const file of commandFiles) {
//       const command = require(`./commands/${file}`);
//       this.commands.set(command.name, command);
//     }
//   }

//   login(token) {
//     this.loadCommands();
//     super.login(token);
//   }
// };
