const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  //Loo up course
  //if doesn't extsts return 404
  let course = courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.status(404).send("The course with given id does not exists");
    return;
  }

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //return the same course
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
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.status(404).send("The course with given id was not found");
  }
  res.send(course);
});

module.exports = router;
