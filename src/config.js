require("dotenv").config();

const gameName = "BLY";

const crop1Name = "당근";
const crop1SeedTime = 10;
const crop1SproutTime = 10;
const crop1buyingCost = 1;
const crop1SellingCost = 2;

const crop2Name = "호박";
const crop2SeedTime = 20;
const crop2SproutTime = 20;
const crop2buyingCost = 2;
const crop2SellingCost = 4;

const dishName = "엘븐 와퍼";

module.exports = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  prefix: "!",
  gameName,
  crop1Name,
  crop1SeedTime,
  crop1SproutTime,
  crop1buyingCost,
  crop1SellingCost,
  crop2Name,
  crop2SeedTime,
  crop2SproutTime,
  crop2buyingCost,
  crop2SellingCost,
  dishName,
};
