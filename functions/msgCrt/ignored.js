/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */
module.exports = async (
  message,
  command,
  ignoreWarnRateLimitManager,
  client = message.client,
) => {
  const ignoreWarnRlBucket = ignoreWarnRateLimitManager.acquire(
    `${message.author.id}_${command.name}`,
  );
  if (ignoreWarnRlBucket.limited) return;
  try {
    ignoreWarnRlBucket.consume();
  } catch (e) {}

  return message
    .reply({
      embeds: [
        new client.embed().desc(
          `${client.emoji.warn} **Ignored Channel : You can't use me here**`,
        ),
      ],
    })
    .then(async (m) =>
      setTimeout(async () => {
        await m.delete().catch(() => {});
      }, 5000),
    )
    .catch(() => {});
};
