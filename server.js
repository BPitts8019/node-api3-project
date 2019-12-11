const express = require('express');
const userRouter = require("./users/userRouter");
const server = express();

//apply global middleware
server.use(express.json());
server.use(logger);

//enpoint routing
server.get('/', (req, res) => {
   res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter);

//404 not found
server.use((req, res) => {
   res.status(404).json({
      message: "Route was not found"
   });
});

//custom middleware
function logger(req, res, next) {}

module.exports = server;
