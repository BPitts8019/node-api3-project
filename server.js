const express = require("express");
const logger = require("./utils/logger");

const server = express();
server.use(logger());

server.get("/", (req, res) => {
   res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
