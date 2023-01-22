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

    const date = new Date();

    for await (const coin of coins) {
      await Coin.create({
        uuid: coin.uuid,
        name: coin.name,
        symbol: coin.symbol,
        iconUrl: coin.iconUrl,
        color: coin.color,
        price: coin.price,
        updated_at: date
      });
    }

    res.send({ message: "Successfully seeded the database" });
  } catch (error) {
    console.log(error);
  }
};

const updateAllPrices = async (req, res) => {
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
        "X-RapidAPI-Key": "e7d9710815msh122213a08c14487p1d2ed7jsnfcc325940b79",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com"
      }
    };

    let response = await axios.request(options);
    const coins = response.data.data.coins;

    const date = new Date();

    for await (const coin of coins) {
      const body = {
        price: coin.price,
        updated_at: date
      };
      console.log(coin.name + " " + coin.price);
      console.log("UUID: " + coin.uuid)
      console.log(body);
      let c = await Coin.findOneAndUpdate(
        {
          uuid: coin.uuid
        },
        body
      ).select("-__v");
      console.log(c)
    }

    res.send({ message: "Successfully updated the database" });
  } catch (error) {
    console.log(error);
  }
};

const updateCoinPrice = async (req, res) => {
  try {
    const { coin_id } = req.params;
    console.log(coin_id);

    const options = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com/coin/${coin_id}/price`,
      params: { referenceCurrencyUuid: "yhjMzLPhuIDl" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST
      }
    };

    let response = await axios.request(options);

    if (response.data.status === "success") {
      const coinData = response.data.data;

      res.json(coinData);
    }
  } catch (error) {
    console.log(error);
  }
};

const getDbCoins = async (req, res) => {
  try {
    const allCoins = await Coin.find();
    res.json(allCoins);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCoins24Hr,
  updateCoinPrice,
  getDbCoins,
  updateAllPrices
};
