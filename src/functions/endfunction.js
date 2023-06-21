const { db } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const { gameName } = require("../config");

async function endfunction(interaction) {
  const userDoc = db.collection("users").doc(interaction.author.id);
  const snapshot = await userDoc.get();

  // If it exists, return a message
  if (!snapshot.exists) {
    interaction.reply(`아직 ${gameName}을 시작하지 않으셨습니다`);
  } else {
    endPage(interaction, "first");
    const collector = interaction.channel.createMessageComponentCollector({});

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();
      if (interaction.customId === "end") {
        endPage(interaction, "second");
      }
    });
  }
}

async function endPage(interaction, page) {
  if (page === "first") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("end").setLabel("Delete Data").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName} 그만두기`,
          description: `아래 버튼을 누르면 지금까지 ${gameName}에서 생성된 모든 데이터는 지워지고, 돌이킬 수 없습니다.`,
        },
      ],
      components: [row],
    };
    interaction.reply(embed);
  } else if (page === "second") {
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName}의 모든 데이터가 지워졌습니다`,
          description: `즐거웠어요 안녕`,
        },
      ],
      components: [],
    };
    interaction.editReply(embed);
    const userDoc = db.collection("users").doc(interaction.user.id);
    userDoc.delete();
  }
}
module.exports = endfunction;
