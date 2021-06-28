const express = require("express");
const usersDb = require("./userDb");
const { validateUser, validateId } = require("../utils/validation");
const { errorResponse500 } = require("../utils/errors");
const DB_ERROR = "There was a problem accessing the user database";

const router = express.Router();

router.post("/", validateUser(), async (req, res) => {
   const { name } = req.body;

   try {
      const newUser = await usersDb.insert({ name });
      res.status(201).json(newUser);
   } catch (error) {
      errorResponse500(res, error, DB_ERROR);
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
      errorResponse500(res, error, DB_ERROR);
   }
});

router.get("/:id", validateId(), (req, res) => {
   res.json(req.user);
});

router.get("/:id/posts", (req, res) => {
   // do your magic!
});

router.delete("/:id", validateId(), async (req, res) => {
   const { id } = req.params;
   try {
      await usersDb.remove(id);
      res.json(req.user);
   } catch (error) {
      errorResponse500(res, error, DB_ERROR);
   }
});

router.put("/:id", (req, res) => {
   // do your magic!
});

module.exports = router;
