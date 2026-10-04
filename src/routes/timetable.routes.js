

const express = require("express");

const {
  createTimetable,
  getTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
} = require("../controllers/timetable.controller.js");

const {protect} = require("../middlewares/auth.middleware.js");
const validateTimetable = require(
  "../middlewares/validateTimetable.js"
);

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(validateTimetable, createTimetable)
  .get(getTimetables);

router
  .route("/:id")
  .get(getTimetableById)
  .patch(validateTimetable, updateTimetable)
  .delete(deleteTimetable);

module.exports = router;
