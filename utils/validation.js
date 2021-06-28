const userDb = require("../users/userDb");
const postDb = require("../posts/postDb");

const validateId = (dbName = "user") => {
   const db = {
      user: userDb,
      post: postDb,
   }[dbName];

   return async (req, res, next) => {
      const { id } = req.params;
      if (!db) {
         console.error(
            `${req.method} ${req.url} Unable to find database: ${dbName}`
         );
         return res
            .status(500)
            .json({ message: "There was a problem processing your request!" });
      }

      if (!Number(id)) {
         return res.status(400).json({ message: `Invalid ${dbName} id` });
      }

      try {
         const data = await db.getById(Number(id));

         if (!data) {
            return res.status(400).json({ message: `Invalid ${dbName} id` });
         }

         req[dbName] = data;
         next();
      } catch (error) {
         res.status(500).json({
            message: `There was a problem accessing the database`,
         });
      }
   };
};

const validateUser = () => (req, res, next) => {
   if (!req.body) {
      return res.status(400).json({ message: "Missing user data" });
   }

   if (!req.body.name) {
      return res.status(400).json({ message: "Missing required name field." });
   }

   next();
};

const validatePost = () => (req, res, next) => {
   if (!req.body) {
      return res.status(400).json({ message: "Missing post data" });
   }

   if (!req.body.text) {
      return res.status(400).json({ message: "Missing required text field." });
   }

   next();
};

module.exports = {
   validateId,
   validateUser,
   validatePost,
};
