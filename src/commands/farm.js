const farmommandBuilder = require(`../SlashCommandBuilders/farmCommandBuilder.js`);
const showfunction = require(`../functions/farmfunction.js`);
module.exports = {
  data: farmommandBuilder,
  async execute(interaction) {
    await showfunction(interaction);
  },
};
