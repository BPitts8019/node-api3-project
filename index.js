const express = require("express");
const server = express();
const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");

//apply global middleware
server.use(express.json());

//enpoint routing
/**
 * GET	/api
 * Returns an array of all the API enpoints and posible methods for use. 
 * @returns {Array} API endpoints and methods
 */
server.get("/api", (req, res) => {
   res.json(["nothing here... yet"]);
});

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

//404 not found
server.use((req, res) => {
   res.status(404).json({
      message: "Route was not found"
   });
});

//start the server
const port = 8080;
server.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});