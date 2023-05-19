const shopCommandBuilder = require(`../SlashCommandBuilders/shopCommandBuilder.js`);
const shopfunction = require(`../functions/shopfunction.js`);
module.exports = {
  data: shopCommandBuilder,
  async execute(interaction) {
    await shopfunction(interaction);
  },
};
