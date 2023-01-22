const router = require("express").Router();
const seedRoute = require("./seed");
const priceRoutes = require("./coinPrices");

router.use("/value", priceRoutes);
router.use("/seed", seedRoute);

module.exports = router;