const router = require("express").Router();
const {
  updateCoinPrice,
  getDbCoins,
  updateAllPrices
} = require("../../../controllers/coin/allCoins");

router.get("/", getDbCoins);
router.get("/update", updateAllPrices);
router.get("/:coin_id", updateCoinPrice);


module.exports = router;
