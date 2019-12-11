const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("<h1>Welcome to SocialBook</h1>");
});

router.get("/api", (req, res) => {
   res.send("<h1>SocialBook API</h1>");
});

module.exports = router;