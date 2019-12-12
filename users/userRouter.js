const express = require('express');
const userDb = require("./userDb");

const router = express.Router();

/**
 * POST	/api/users
 * Creates a new user using the information sent inside the request body.
 * @param {string} name 
 * @returns {Object} the new user
 */
router.post('/', validateUser, async (req, res) => {
   try {
      const newUser = await userDb.insert({name: req.body.name});
      res.json(newUser);
   } catch (error) {
      res.status(500).json({ 
         response: error.response,
         message: "There was an error while creating the user"
      });
   }
});

/**
 * GET	/api/users
 * Retrieves all users from the database.
 * @returns {Array} list of all the users in the database
 */
router.get('/', async (req, res) => {
   try {
      const users = await userDb.get();
      res.json(users);
   } catch (error) {
      res.status(500).json({ error: "The user information could not be retrieved." });
   }
});


router.get('/:id', validateUserId, (req, res) => {
   console.log("Get User by ID");
   res.json(req.user);
});

router.put('/:id', (req, res) => {
   // do your magic!
});

router.delete('/:id', (req, res) => {
   // do your magic!
});


router.get('/:id/posts', validateUserId, async (req, res) => {
   const userPosts = await userDb.getUserPosts(req.user.id);
   console.log(userPosts);

   res.json(userPosts);
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});











//custom middleware
async function validateUserId(req, res, next) {
   try {
      console.log("before db call");
      console.log(req.params.id);
      const user = await userDb.getById(Number(req.params.id))

      if (!user) {
         return res.status(400).json({ message: "invalid user id" });
      }
      
      req.user = user;
      next();
   } catch (error) {
      res.status(500).json({ error: "The user information could not be retrieved." });
   }
}

function validateUser(req, res, next) {
   if (!req.body) {
      return res.status(400).json({ message: "missing user data" });
   }

   if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" });
   };

   next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
