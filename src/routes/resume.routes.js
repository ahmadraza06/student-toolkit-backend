const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const validateResume = require("../middlewares/validateResume");

const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resume.controller");

const router = express.Router();

// Every route requires authentication
router.use(protect);

router
  .route("/")
  .post(validateResume,createResume)
  .get(getResumes);

router
  .route("/:id")
  .get(getResumeById)
  .patch(validateResume,updateResume)
  .delete(deleteResume);

module.exports = router;