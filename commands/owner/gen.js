/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */
const bcrypt = require('bcrypt');
const vouchercode = require("voucher-code-generator")

module.exports = {
    name: "gen",
    aliases: ["generate"],
    cooldown: "",
    category: "owner",
    usage: "<guild/user>",
    description: "Generate redeem code",
    args: true,
    vote: false,
    new: false,
    admin: true,
    owner: true,
    botPerms: [],
    userPerms: [],
    player: false,
    queue: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (client, message, args, emoji) => {

        if (args[0] == 'user') {

            let user = vouchercode.generate({
                prefix: "user-",
                length: 16,
                charset: vouchercode.charset("alphanumeric")
            })
              await client.db.vouchers.set(`${user}`, true)
            return message.reply({
              embeds: [
                new client.embed().desc(
                  `${
                    client.emoji.prime
                  }** | Your generated code is: ||${user}||**`,
                ),
              ],
            });
          }
          if (args[0] == 'guild') {
            let guild = vouchercode.generate({
                prefix: "guild-",
                length: 16,
                charset: vouchercode.charset("alphanumeric")
            })
              await client.db.vouchers.set(`${guild}`, true)
            return message.reply({
              embeds: [
                new client.embed().desc(
                  `${
                    client.emoji.prime
                  }** | Your generated code is: ||${guild}||**`,
                ),
              ],
            });
          }

    }
}