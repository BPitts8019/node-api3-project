const express = require('express');
const userDb = require("./userDb");

const router = express.Router();

router.post('/', async (req, res) => {

});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', async (req, res) => {
   try {
      const users = await userDb.get();
      res.json(users);
   } catch (error) {
      res.status(500).json({ error: "The user information could not be retrieved." });
   }
});

router.get('/:id', validateUserId, (req, res) => {
   res.json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
   // try {
      console.log("before db call");
      console.log(req.params.id);
      userDb.getById(Number(req.params.id))
         .then(user => {
            console.log(user);
            next();
         })
         .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." });
         })
      

      // if (!user) {
      //    res.status(400).json({ message: "invalid user id" });
      // }
      
      // req.user = user;
      // next();
   // } catch (error) {
      
   // }
}

function validateUser(req, res, next) {

}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
