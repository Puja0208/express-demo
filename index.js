const debug = require("debug")("app:startup");

const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes//courses");
const home = require("./routes/home");
const authenticate = require("./auth");
const app = express();

app.use(express.json()); //to enable parsing of json objects
app.use(express.urlencoded({ extended: true })); //parses incoming requests with url incoming payloads i.e. key=value&key=value2
app.use(express.static("public"));
app.use(logger);
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

//configuration
console.log("Applicatio name", config.get("name"));
console.log("Male server", config.get("mail.host"));
// console.log("Male server password", config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled");
}

app.use(authenticate);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
