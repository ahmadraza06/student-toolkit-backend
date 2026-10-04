
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      default: "My Resume",
    },

    personalInfo: {
      fullName: { type: String, trim: true, maxlength: 100 },
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true, maxlength: 30 },
      location: { type: String, trim: true, maxlength: 150 },
      summary: { type: String, trim: true, maxlength: 2000 },
    },

    education: [
      {
        institution: { type: String, trim: true, maxlength: 200 },
        degree: { type: String, trim: true, maxlength: 150 },
        year: { type: String, trim: true, maxlength: 50 },
        score: {type: String,default: "",},
      },
    ],

    skills: {
      type: [String],
      default: [],
    },

    projects: [
      {
        name: { type: String, trim: true, maxlength: 150 },
        description: { type: String, trim: true, maxlength: 2000 },
        technologies: { type: String, trim: true, maxlength: 300 },
        link: {type: String,default: ""},
      },
    ],

    experience: [
      {
        company: { type: String, trim: true, maxlength: 200 },
        role: { type: String, trim: true, maxlength: 150 },
        duration: { type: String, trim: true, maxlength: 100 },
        description: { type: String, trim: true, maxlength: 2000 },
      },
    ],
  },
  { timestamps: true }
);
resumeSchema.index({
  userId:1,
  updatedAt:-1
})

module.exports = mongoose.model("Resume", resumeSchema);