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

router.get("/:id/posts", validateId(), async (req, res) => {
   const { id } = req.params;
   try {
      const posts = await usersDb.getUserPosts(id);
      res.json(posts);
   } catch (error) {
      errorResponse500(res, error, DB_ERROR);
   }
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

router.put("/:id", validateUser(), validateId(), async (req, res) => {
   const { id } = req.params;
   try {
      const numRecs = await usersDb.update(id, { name: req.body.name });
      console.log(`Num recs updated: ${numRecs}`);
      req.user = await usersDb.getById(id);
      res.json(req.user);
   } catch (error) {
      errorResponse500(res, error, DB_ERROR);
   }
});

module.exports = router;
