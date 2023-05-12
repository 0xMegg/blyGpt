const startCommandBuilder = require(`../SlashCommandBuilders/startCommandBuilder.js`);
const startfunction = require(`../functions/startfunction.js`);
module.exports = {
  data: startCommandBuilder,
  async execute(interaction) {
    await startfunction(interaction);
  },
};
