
const resumeService = require("../services/resume.services");

async function createResume(req, res, next) {
  try {
    const resume = await resumeService.createResume(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: { resume },
    });
  } catch (error) {
    next(error);
  }
}

async function getResumes(req, res, next) {
  try {
    const resumes = await resumeService.getResumes(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: { resumes },
    });
  } catch (error) {
    next(error);
  }
}

async function getResumeById(req, res, next) {
  try {
    const resume = await resumeService.getResumeById(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: { resume },
    });
  } catch (error) {
    next(error);
  }
}

async function updateResume(req, res, next) {
  try {
    const resume = await resumeService.updateResume(
      req.user.id,
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: { resume },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteResume(req, res, next) {
  try {
    await resumeService.deleteResume(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};