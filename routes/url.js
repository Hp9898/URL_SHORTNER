const express = require("express");
const router = express.Router();
const {GeneratetheUrl,analyticsforlink} = require("../controllers/url");

router.post("/",GeneratetheUrl);

router.get("/ana/:shortId",analyticsforlink)

module.exports = router;