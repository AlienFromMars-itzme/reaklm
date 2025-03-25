/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const YML = require("js-yaml").load(
  require("fs").readFileSync("./config.yml", "utf8"),
);
const bot = require("../main/extendedClient");

const client = new bot();
require("@utils/antiCrash")(client);
client.connect(
  YML.HYDROGEN.TOKEN,
  YML.HYDROGEN.PREFIX,
  YML.HYDROGEN.EMOJIS,
  YML.HYDROGEN.COLOR,
  YML.HYDROGEN.TOPGGAUTH,
  YML.HYDROGEN.VOTEURI,
);
module.exports = client;
