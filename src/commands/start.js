const startCommandBuilder = require(__dirname +
  `/../SlashCommandBuilders/startCommandBuilder.js`);
const startfunction = require(__dirname + `/../functions/startfunction.js`);
module.exports = {
  data: startCommandBuilder,
  async execute(interaction) {
    await startfunction(interaction);
  },
};
