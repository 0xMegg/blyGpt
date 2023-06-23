const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

async function testfunction(interaction) {
  testPage(interaction, "main");

  const collector = interaction.channel.createMessageComponentCollector({});

  collector.on("collect", async (interaction) => {
    testPage(interaction, interaction.customId);
  });
}

async function testPage(interaction, page) {
  if (page === "main") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("second").setLabel(">").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `가이드`,
          description: `는 구매한 씨앗을 작물로 성장시켜 판매해서 차익을 얻거나, 여러 작물로 요리를 만드는 디스코드 게임입니다`,
          footer: {
            text: "1/6",
          },
        },
      ],
      components: [row],
    };
    interaction.reply(embed);
  } else if (page === "second") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("second").setLabel(">").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `bye`,
          description: `asdf`,
          footer: {
            text: "1/6",
          },
        },
      ],
      components: [row],
    };
    interaction.update(embed);
  }
}
module.exports = testfunction;
