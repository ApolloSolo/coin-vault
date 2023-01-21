require("dotenv").config();
const { Coin } = require("../../models");
const axios = require("axios");

const getAllCoins24Hr = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "50",
        offset: "0"
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST
      }
    };

    let response = await axios.request(options);
    const coins = response.data.data.coins;

    for await (const coin of coins) {
      await Coin.create({
        uuid: coin.uuid,
        name: coin.name,
        symbol: coin.symbol,
        iconUrl: coin.iconUrl,
        color: coin.color
      });
    }

    res.send({ message: "Successfully seeded the database" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllCoins24Hr };
