"use strict";
const express = require("express");
const router = express.Router();
const user = require("./user");
const protectedRoutes = require("./userProtected");
//const code = require("./code");
//const leaderboard = require("./leaderboard");
const authenticateMiddleware = require("../middlewares/authenticate");
/* GET home page. */
router.get("/", function(req, res) {
	res.json({ title: "Express" });
});
router.use("/user", user);
router.use(authenticateMiddleware.authenticate);
router.use("/user_protected", protectedRoutes);
module.exports = router;
