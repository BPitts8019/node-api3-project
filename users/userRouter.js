const express = require('express');
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

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

/**
 * GET	/api/users/:id
 * Retrieves a user with the specified id
 * @param {number} id 
 * @returns {Object} the user with the specified id
 */
router.get('/:id', validateUserId, (req, res) => {
   res.json(req.user);
});

/**
 * PUT	/api/users/:id
 * Updates a user with the specified id
 * @param {number} id
 * @param {string} name
 * @returns {Object} the updated user with the specified id
 */
router.put('/:id', validateUserId, validateUser, async (req, res) => {
   try {
      const numRecs = await userDb.update(req.user.id, {name: req.body.name});
      console.log(`${numRecs} updated`);
      const user = await userDb.getById(req.user.id);
      res.json(user);
   } catch (error) {
      res.status(500).json({ 
         response: error.response || error,
         message: "The user could not be updated." 
      });
   }
});

router.delete('/:id', (req, res) => {

});

/**
 * GET	/api/users/:id/posts
 * Retrieves all of the posts by the user with the specified id
 * @param {number} id 
 * @returns {Array} the user posts
 */
router.get('/:id/posts', validateUserId, async (req, res) => {
   const userPosts = await userDb.getUserPosts(req.user.id);

   res.json(userPosts);
});

/**
 * POST	/api/users/:id/posts
 * Creates a new post for the user with the specified id
 * @param {number} id 
 * @param {string} text
 * @returns {Object} the new user post
 */
router.post('/:id/posts', validatePost, validateUserId, async (req, res) => {
   try {
      console.log(req.user);
      const newPost = await postDb.insert({
         user_id: req.user.id,
         text: req.body.text
      });
      res.json(newPost);
   } catch (error) {
      res.status(500).json({ 
         response: error.response || error,
         message: "The user post could not be created." 
      });
   }
});

//custom middleware
async function validateUserId(req, res, next) {
   try {
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
   if (!req.body || Object.entries(req.body).length === 0) {
      return res.status(400).json({ message: "missing user data" });
   }

   if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" });
   };

   next();
}

function validatePost(req, res, next) {
   if (!req.body || Object.entries(req.body).length === 0) {
      return res.status(400).json({ message: "missing post data" });
   }

   if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" });
   }

   next();
}

module.exports = router;
