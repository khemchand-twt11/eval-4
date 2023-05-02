const { createClient } = require("redis");
require("dotenv").config();
const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-12167.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 12167,
  },
});
client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

module.exports = { client };
