const { db } = require("../fbase");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { startGold, gameName } = require("../config");

async function startfunction(interaction) {
  const userDoc = db.collection("users").doc(interaction.author.id);
  const snapshot = await userDoc.get();
  // If it exists, return a message
  if (snapshot.exists) {
    interaction.reply("u r already start! type 'bly game'");
  } else {
    startPage(interaction, "first");

    const collector = interaction.channel.createMessageComponentCollector({});

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "next") {
        startPage(interaction, "next");
      } else if (interaction.customId === "prev") {
        startPage(interaction, "prev");
      } else if (interaction.customId === "agree") {
        const userDoc = db.collection("users").doc(interaction.user.id);
        const crop1Doc = userDoc.collection("farm").doc("crop1");
        const crop2Doc = userDoc.collection("farm").doc("crop2");
        const crop3Doc = userDoc.collection("farm").doc("crop3");
        const crop4Doc = userDoc.collection("farm").doc("crop4");
        const crop5Doc = userDoc.collection("farm").doc("crop5");
        const crop6Doc = userDoc.collection("farm").doc("crop6");
        const crop7Doc = userDoc.collection("farm").doc("crop7");
        const crop8Doc = userDoc.collection("farm").doc("crop8");
        const crop9Doc = userDoc.collection("farm").doc("crop9");
        const seed1Doc = userDoc.collection("inventory").doc("seed1");
        const seed2Doc = userDoc.collection("inventory").doc("seed2");
        const harvested1Doc = userDoc.collection("inventory").doc("harvested1");
        const harvested2Doc = userDoc.collection("inventory").doc("harvested2");
        const dishDoc = userDoc.collection("inventory").doc("dish");
        await userDoc.set({
          discordId: interaction.user.id,
          lastLogin: new Date(),
          gold: startGold,
        });
        await crop1Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop2Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop3Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop4Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop5Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop6Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop7Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop8Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await crop9Doc.set({
          type: 0,
          createdAt: new Date(),
        });
        await seed1Doc.set({
          number: 0,
        });
        await seed2Doc.set({
          number: 0,
        });
        await harvested1Doc.set({
          number: 0,
        });
        await harvested2Doc.set({
          number: 0,
        });
        await dishDoc.set({
          number: 0,
        });

        startPage(interaction, "agreed");
      }
    });
  }
}

async function startPage(interaction, page) {
  if (page === "first") {
    const embed = new EmbedBuilder()
      .setTitle(`${gameName}에 오신것을 환영합니다!`)
      .setDescription(
        `${gameName}을 플레이하기 위해선 사용자를 특정할 수 있는 디스코드 아이디의 수집이 필요합니다. 수집된 디스코드 아이디는 사용자를 특정하는 용도 이외에는 어디에도 사용되지 않습니다.`
      );
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("next").setLabel(">").setStyle(1)
    );
    const message = {
      embeds: [embed],
      components: [row],
    };
    interaction.reply(message);
  } else if (page === "prev") {
    const embed = new EmbedBuilder()
      .setTitle("Welcome1")
      .setDescription("상세설명")
      .addFields({
        name: "빌리야에 온걸 환영해",
        value: "빌리야는 어쩌구 저쩌구",
      });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("next").setLabel(">").setStyle(1)
    );
    const message = {
      embeds: [embed],
      components: [row],
    };
    interaction.update(message);
  } else if (page === "next") {
    const embed = {
      title: "title",
      description: "desc",
      fields: [
        {
          name: "name",
          value: "value",
        },
      ],
    };
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("prev").setLabel("<").setStyle(1),
      new ButtonBuilder().setCustomId("agree").setLabel("Agreement").setStyle(1)
    );
    const message = {
      embeds: [embed],
      components: [row],
    };
    interaction.update(message);
  } else if (page === "agreed") {
    const message = {
      embeds: [
        {
          title: "Welcome aboard!",
          description: "Now you are farmer",
        },
      ],
      components: [],
    };
    interaction.update(message);
  }
}

module.exports = startfunction;
