const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("<p>Made it to GET /api/users</p>");
});

module.exports = router;