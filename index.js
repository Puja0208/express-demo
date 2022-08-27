const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json()); //to enable parsing of json objects

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World  !!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //Look up the course
  let course = courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.status(404).send("The course with given id does not exists");
    return;
  }

  //Validate
  //If ivalid return 400 - bad request

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //Update course
  //return updated course
  course.name = req.body.name;
  //Return the updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(course, schema);
  return result;
}

//api/courses/1
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.status(404).send("The course with given id was not found");
  }
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
