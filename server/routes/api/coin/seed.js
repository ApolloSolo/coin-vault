const router = require("express").Router();
const { getAllCoins24Hr } = require("../../../controllers/coin/allCoins");

router.get("/", getAllCoins24Hr);

module.exports = router;