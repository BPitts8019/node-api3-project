const express = require("express");
const users_db = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
   // do your magic!
});

router.post("/:id/posts", (req, res) => {
   // do your magic!
});

router.get("/", async (req, res) => {
   try {
      const users = await users_db.get();
      res.json(users);
   } catch (error) {
      console.error(
         `There was a problem accessing the user database:\n${error}`
      );
      res.status(500).json({ message: "Internal Server error" });
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

//custom middleware

function validateUserId(req, res, next) {
   // do your magic!
}

function validateUser(req, res, next) {
   // do your magic!
}

function validatePost(req, res, next) {
   // do your magic!
}

module.exports = router;
