const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ComponentType,
  AttachmentBuilder,
} = require("discord.js");
const { Pagination, ExtraRowPosition } = require("pagination.djs");
const Canvas = require("@napi-rs/canvas");
const farmImageMaker = require("../services/farmImageMaker");

async function farmfunction(interaction) {
  const cropRef = db
    .collection("users")
    .doc(interaction.user.id)
    .collection("myFarm")
    .doc("crop1");
  const cropDoc = await cropRef.get();
  const cropData = cropDoc.data();
  const type = cropData.type;
  const time = cropData.createAt._seconds;

  const attachment = await farmImageMaker(type, time);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("refresh").setLabel("🔄").setStyle(1)
  );

  let message = {
    content: "farm",
    files: [attachment],
    components: [row],
  };

  const collector = interaction.channel.createMessageComponentCollector({
    componentType: ComponentType.Button,
    // time: 60000,
  });

  collector.on("collect", async (i) => {
    if (i.user.id === interaction.user.id) {
      switch (i.customId) {
        case "refresh":
          message = {
            content: "editfarm",
            files: [await farmImageMaker(type, time)],
            components: [row],
          };
          i.message.edit(message);
          break;
      }
    } else {
      i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    }
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} interactions.`);
  });

  interaction.reply(message);
}

module.exports = farmfunction;
