const router = require("express").Router();
const userRoutes = require("./userRoutes");
const coinRoutes = require("./coin");

router.use("/user", userRoutes);
router.use("/coin", coinRoutes);

module.exports = router;
