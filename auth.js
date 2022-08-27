function authenticate(req, res, next) {
  console.log("Authenticating....");
  next(); //to pas control to next middleware
}
module.exports = authenticate;
