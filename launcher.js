/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const launch = async () => {
  require("dotenv").config();
  require("module-alias/register");
  require("@main/sharder.js");
};
launch();
