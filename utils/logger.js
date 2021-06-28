// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API

module.exports = () => (req, res, next) => {
   const timestamp = new Date().toISOString();
   console.log(`${req.method} ${req.url} ${timestamp}`);
   next();
};
