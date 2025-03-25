/** @format */

const axios = require("axios");

export default class extends Command {
  override slash = false;
  description = "kiss someone";
  examples = [`${this.name} @flame`];
  override usage = `${this.name} [member]`;

  async execute(client: Flare, ctx: Context) {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .description(
            `${ctx.author} kissed ${ctx.mentions.users?.first() || "some random weirdo"}`
          )
          .image(await randomNekoImage(client, this.name))
      ]
    });
  }
}
