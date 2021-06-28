const errorResponse500 = (
   res,
   error,
   developerMsg,
   message = "Internal Server error"
) => {
   console.error(`${developerMsg}: ${error}`);
   res.status(500).json({ message });
};

module.exports = {
   errorResponse500,
};
