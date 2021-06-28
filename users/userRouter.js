const express = require("express");
const usersDb = require("./userDb");
const { validateUser } = require("../utils/validation");
const { errorResponse500 } = require("../utils/errors");

const router = express.Router();

router.post("/", validateUser(), async (req, res) => {
   const { name } = req.body;

   try {
      const newUser = await usersDb.insert({ name });
      res.status(201).json(newUser);
   } catch (error) {
      errorResponse500(
         res,
         error,
         "There was a problem accessing the user database"
      );
   }
});

router.post("/:id/posts", (req, res) => {
   // do your magic!
});

router.get("/", async (req, res) => {
   try {
      const users = await usersDb.get();
      res.json(users);
   } catch (error) {
      errorResponse500(
         res,
         error,
         "There was a problem accessing the user database"
      );
   }
});

router.get("/:id", (req, res) => {
   // do your magic!
});

router.get("/:id/posts", (req, res) => {
   // do your magic!
});

router.delete("/:id", (req, res) => {
   // do your magic!
});

router.put("/:id", (req, res) => {
   // do your magic!
});

module.exports = router;
