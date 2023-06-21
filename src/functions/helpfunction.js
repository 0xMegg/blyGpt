const { db } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const { gameName, dishName } = require("../config");

async function endfunction(interaction) {
  helpPage(interaction, "main");
  const collector = interaction.channel.createMessageComponentCollector({});

  collector.on("collect", async (interaction) => {
    await interaction.deferUpdate();
    helpPage(interaction, interaction.customId);
  });
}

async function helpPage(interaction, page) {
  if (page === "main") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("disabled")
        .setLabel("<")
        .setStyle(1)
        .setDisabled(true),
      new ButtonBuilder().setCustomId("second").setLabel(">").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName} 가이드`,
          description: `${gameName}는 구매한 씨앗을 작물로 성장시켜 판매해서 차익을 얻거나, 여러 작물로 요리를 만드는 디스코드 게임입니다`,
          footer: {
            text: "1/5",
          },
        },
      ],
      components: [row],
    };
    interaction.reply(embed);
  } else if (page === "first") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("disabled")
        .setLabel("<")
        .setStyle(1)
        .setDisabled(true),
      new ButtonBuilder().setCustomId("second").setLabel(">").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName} 가이드`,
          description: `${gameName}는 구매한 씨앗을 작물로 성장시켜 판매해서 차익을 얻거나, 여러 작물로 요리를 만드는 디스코드 게임입니다`,
          footer: {
            text: "1/5",
          },
        },
      ],
      components: [row],
    };
    interaction.editReply(embed);
  } else if (page === "second") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("first").setLabel("<").setStyle(1),
      new ButtonBuilder().setCustomId("third").setLabel(">").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName} start`,
          description: `게임을 시작하기 위해선 디스코드의 식별아이디 수집이 필요합니다. \`${gameName} start\`를 입력하여 나온 메시지의 약관을 살펴보신 후 동의를 해주시면 게임 계정이 생성되고, \`${gameName} game\`을 통해 게임을 시작하실 수 있습니다.`,
          footer: {
            text: "2/5",
          },
        },
      ],
      components: [row],
    };
    interaction.editReply(embed);
  } else if (page === "third") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("second").setLabel("<").setStyle(1),
      new ButtonBuilder().setCustomId("fourth").setLabel(">").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName} 농장`,
          description: `씨앗을 심으면 정해진 시간이 지나 싹이 나고, 작물이 되는 곳입니다. 다 자란 작물은 \`전부 수확\` 버튼으로 수확이 가능하고, 선택메뉴를 통해서 농장, 상점, 가방으로 이동할 수 있습니다.`,
          footer: {
            text: "3/5",
          },
        },
      ],
      components: [row],
    };
    interaction.editReply(embed);
  } else if (page === "fourth") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("third").setLabel("<").setStyle(1),
      new ButtonBuilder().setCustomId("fifth").setLabel(">").setStyle(1)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName} 상점`,
          description: `작물의 정보를 보고 씨앗을 구매할 수 있는 곳입니다. 골드가 충분하다면 버튼으로 각 씨앗을 구매할 수 있습니다. 선택메뉴를 통해서 농장, 상점, 가방으로 이동할 수 있습니다.`,
          footer: {
            text: "4/5",
          },
        },
      ],
      components: [row],
    };
    interaction.editReply(embed);
  } else if (page === "fifth") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("fourth").setLabel("<").setStyle(1),
      new ButtonBuilder()
        .setCustomId("disabled")
        .setLabel(">")
        .setStyle(1)
        .setDisabled(true)
    );
    const embed = {
      content: "",
      embeds: [
        {
          title: `${gameName} 가방`,
          description: `구매한 씨앗을 심고, 수확한 작물을 팔고, 작물을 요리할 수 있는 곳입니다. 씨앗은 농장에 자리가 있어야 심을 수 있고, 작물이 충분하다면 요리하여 ${dishName}를 만들 수 있습니다. 선택메뉴를 통해서 농장, 상점, 가방으로 이동할 수 있습니다.`,
          footer: {
            text: "5/5",
          },
        },
      ],
      components: [row],
    };
    interaction.editReply(embed);
  }
}
module.exports = endfunction;
