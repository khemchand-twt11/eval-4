const express = require("express");
const { client } = require("../helper/redis.helper");
const cityRoute = express.Router();
const axios = require("axios");
const { cityModel } = require("../models/city.model");
cityRoute.post("/", async (req, res) => {
  try {
    const { ip } = req.body;
    const token = req.token;
    const userid = req.userid;
    const ifBlackilisted = await client.get(token);
    if (ifBlackilisted) {
      res.status(400).send({ msg: "login first" });
    } else {
      const ifCityInRedis = await client.get(ip);
      if (ifCityInRedis) return res.status(200).send(ifCityInRedis);
      const result = await axios.get(`https://ipapi.co/${ip}/json/`);
      const city = result.data.city;
      res.status(200).send(city);

      const newCity = new cityModel({ userid, city });
      await newCity.save();
      await client.set(ip, city);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = { cityRoute };
