function log(req, res, next) {
  console.log("Logging....");
  next(); //to pas control to next middleware
}

module.exports = log;
