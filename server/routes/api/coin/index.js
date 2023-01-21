const router = require("express").Router();
const seedRoute = require("./seed");

router.use("/seed", seedRoute);

module.exports = router;