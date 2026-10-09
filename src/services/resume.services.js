
const mongoose = require("mongoose");
const Resume = require("../models/Resume");

const allowedFields = [
  "title",
  "personalInfo",
  "education",
  "skills",
  "projects",
  "experience",
];

const sanitizeResumeData = (data) => {
  const cleanData = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      cleanData[field] = data[field];
    }
  }

  return cleanData;
};



function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateResumeId(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw createError("Invalid resume ID", 400);
  }
}

async function createResume(userId, data) {
  return Resume.create({
    ...data,
    userId,
  });
}

async function getResumes(userId) {
  return Resume.find({ userId }).sort({ updatedAt: -1 });
}

async function getResumeById(userId, resumeId) {
  validateResumeId(resumeId);

  const resume = await Resume.findOne({
    _id: resumeId,
    userId,
  });

  if (!resume) {
    throw createError("Resume not found", 404);
  }

  return resume;
}

async function updateResume(userId, resumeId, data) {
  validateResumeId(resumeId);
  const updateData = sanitizeResumeData(data);
  const resume = await Resume.findOneAndUpdate(
    {
      _id: resumeId,
      userId,
    },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!resume) {
    throw createError("Resume not found", 404);
  }

  return resume;
}

async function deleteResume(userId, resumeId) {
  validateResumeId(resumeId);

  const resume = await Resume.findOneAndDelete({
    _id: resumeId,
    userId,
  });

  if (!resume) {
    throw createError("Resume not found", 404);
  }
}

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};