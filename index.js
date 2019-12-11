const express = require("express");
const server = express();
const welcomeRouter = require("./routers/welcome");
const usersRouter = require("./routers/users");

//apply global middleware
server.use(express.json());

//enpoint routing
server.use("/", welcomeRouter);
server.use("/api/users", usersRouter);

//start the server
const port = 8080;
server.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});