const express = require("express");
const server = express();
const usersRouter = require("./routers/users");

//apply global middleware
server.use(express.json());

//enpoint routing
server.get("/", (req, res) => {
   res.send("<h2>Welcome to SUM SOCIAL API</h>");
});

server.use("/api/users", usersRouter);

//start the server
const port = 8080;
server.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});