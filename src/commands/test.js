const testCommandBuilder = require(`../SlashCommandBuilders/testCommandBuilder.js`);
const testfunction = require(`../functions/testfunction.js`);
module.exports = {
  data: testCommandBuilder,
  async execute(interaction) {
    await testfunction(interaction);
  },
};
