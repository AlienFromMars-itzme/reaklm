/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const YML = require("js-yaml").load(
  require("fs").readFileSync("./config.yml", "utf8"),
);

const { ClusterManager } = require("discord-hybrid-sharding");
[
  {
    file: "./clients/hydrogen.js",
    token: YML.HYDROGEN.TOKEN,
    shards: YML.HYDROGEN.SHARDS,
    perCluster: YML.HYDROGEN.PER_CLUSTER,
  },
].forEach((client) => {
  new ClusterManager(client.file, {
    restarts: {
      max: 5,
      interval: 1000,
    },
    respawn: true,
    mode: "worker",
    token: client.token,
    totalShards: client.shards || "auto",
    shardsPerClusters: parseInt(client.perCluster) || 2,
  })

    .on("shardCreate", (cluster) => {
      require("@plugins/logger").log(
        `Launched cluster ${cluster.id}`,
        "cluster",
      );
    })
    .on("debug", (info) => {
      require("@plugins/logger").log(`${info}`, "cluster");
    })
    .spawn({ timeout: -1 });
});
