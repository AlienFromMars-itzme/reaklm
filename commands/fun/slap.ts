/** @format */

const axios = require("axios");

export default class extends Command {
  override slash = false;
  description = "slap someone";
  examples = [`${this.name} @flame`];
  override usage = `${this.name} [member]`;

  async execute(client: Flare, ctx: Context) {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .description(
            `${ctx.author} slapped ${ctx.mentions.users?.first() || "some random weirdo"}`
          )
          .image(await randomNekoImage(client, this.name))
      ]
    });
  }
}
