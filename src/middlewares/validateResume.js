const allowedTopLevelFields = [
  "title",
  "personalInfo",
  "education",
  "skills",
  "projects",
  "experience",
];

const allowedPersonalInfoFields = [
  "fullName",
  "email",
  "phone",
  "location",
  "summary",
];

const allowedEducationFields = [
  "degree",
  "institution",
  "year",
  "score",
];

const allowedProjectFields = [
  "name",
  "description",
  "technologies",
  "link",
];

const allowedExperienceFields = [
  "role",
  "company",
  "duration",
  "description",
];

const isPlainObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

const hasOnlyAllowedFields = (object, allowedFields) => {
  if (!isPlainObject(object)) return false;

  return Object.keys(object).every((key) =>
    allowedFields.includes(key)
  );
};

const isString = (value) =>
  typeof value === "string";

const validateStringLength = (value, min, max) =>
  isString(value) &&
  value.trim().length >= min &&
  value.trim().length <= max;

const validateResume = (req, res, next) => {
  const data = req.body;

  if (!isPlainObject(data)) {
    return res.status(400).json({
      success: false,
      message: "Request body must be an object",
    });
  }

  // --------------------------------
  // Top-level fields
  // --------------------------------

  if (!hasOnlyAllowedFields(data, allowedTopLevelFields)) {
    return res.status(400).json({
      success: false,
      message: "Invalid resume fields",
    });
  }

  // --------------------------------
  // Title
  // --------------------------------

  if (data.title !== undefined) {
    if (!validateStringLength(data.title, 1, 100)) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 1 and 100 characters",
      });
    }
  }

  // --------------------------------
  // Personal information
  // --------------------------------

  if (data.personalInfo !== undefined) {
    if (
      !isPlainObject(data.personalInfo) ||
      !hasOnlyAllowedFields(
        data.personalInfo,
        allowedPersonalInfoFields
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid personalInfo fields",
      });
    }

    const {
      fullName,
      email,
      phone,
      location,
      summary,
    } = data.personalInfo;

    if (
      fullName !== undefined &&
      !validateStringLength(fullName, 1, 100)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid full name",
      });
    }

    if (
      email !== undefined &&
      !validateStringLength(email, 3, 150)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (
      phone !== undefined &&
      !validateStringLength(phone, 3, 30)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    if (
      location !== undefined &&
      !validateStringLength(location, 1, 150)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid location",
      });
    }

    if (
      summary !== undefined &&
      !validateStringLength(summary, 1, 1000)
    ) {
      return res.status(400).json({
        success: false,
        message: "Summary must be between 1 and 1000 characters",
      });
    }
  }

  // --------------------------------
  // Education
  // --------------------------------

  if (data.education !== undefined) {
    if (!Array.isArray(data.education)) {
      return res.status(400).json({
        success: false,
        message: "Education must be an array",
      });
    }

    if (data.education.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Maximum 10 education entries allowed",
      });
    }

    for (const item of data.education) {
      if (
        !isPlainObject(item) ||
        !hasOnlyAllowedFields(item, allowedEducationFields)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid education fields",
        });
      }

      for (const field of allowedEducationFields) {
        if (
          item[field] !== undefined &&
          !isString(item[field])
        ) {
          return res.status(400).json({
            success: false,
            message: `Education ${field} must be a string`,
          });
        }
      }

      if (
        item.degree !== undefined &&
        item.degree.length > 150
      ) {
        return res.status(400).json({
          success: false,
          message: "Degree is too long",
        });
      }

      if (
        item.institution !== undefined &&
        item.institution.length > 200
      ) {
        return res.status(400).json({
          success: false,
          message: "Institution is too long",
        });
      }

      if (
        item.year !== undefined &&
        item.year.length > 50
      ) {
        return res.status(400).json({
          success: false,
          message: "Year is too long",
        });
      }

      if (
        item.score !== undefined &&
        item.score.length > 50
      ) {
        return res.status(400).json({
          success: false,
          message: "Score is too long",
        });
      }
    }
  }

  // --------------------------------
  // Skills
  // --------------------------------

  if (data.skills !== undefined) {
    if (!Array.isArray(data.skills)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array",
      });
    }

    if (data.skills.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Maximum 50 skills allowed",
      });
    }

    for (const skill of data.skills) {
      if (
        !isString(skill) ||
        skill.trim().length === 0 ||
        skill.length > 100
      ) {
        return res.status(400).json({
          success: false,
          message: "Each skill must be a valid string",
        });
      }
    }
  }

  // --------------------------------
  // Projects
  // --------------------------------

  if (data.projects !== undefined) {
    if (!Array.isArray(data.projects)) {
      return res.status(400).json({
        success: false,
        message: "Projects must be an array",
      });
    }

    if (data.projects.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Maximum 10 projects allowed",
      });
    }

    for (const item of data.projects) {
      if (
        !isPlainObject(item) ||
        !hasOnlyAllowedFields(item, allowedProjectFields)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid project fields",
        });
      }

      for (const field of allowedProjectFields) {
        if (
          item[field] !== undefined &&
          !isString(item[field])
        ) {
          return res.status(400).json({
            success: false,
            message: `Project ${field} must be a string`,
          });
        }
      }

      if (
        item.name !== undefined &&
        item.name.length > 150
      ) {
        return res.status(400).json({
          success: false,
          message: "Project name is too long",
        });
      }

      if (
        item.description !== undefined &&
        item.description.length > 2000
      ) {
        return res.status(400).json({
          success: false,
          message: "Project description is too long",
        });
      }

      if (
        item.technologies !== undefined &&
        item.technologies.length > 500
      ) {
        return res.status(400).json({
          success: false,
          message: "Project technologies are too long",
        });
      }

      if (
        item.link !== undefined &&
        item.link.length > 500
      ) {
        return res.status(400).json({
          success: false,
          message: "Project link is too long",
        });
      }
    }
  }

  // --------------------------------
  // Experience
  // --------------------------------

  if (data.experience !== undefined) {
    if (!Array.isArray(data.experience)) {
      return res.status(400).json({
        success: false,
        message: "Experience must be an array",
      });
    }

    if (data.experience.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Maximum 10 experience entries allowed",
      });
    }

    for (const item of data.experience) {
      if (
        !isPlainObject(item) ||
        !hasOnlyAllowedFields(item, allowedExperienceFields)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid experience fields",
        });
      }

      for (const field of allowedExperienceFields) {
        if (
          item[field] !== undefined &&
          !isString(item[field])
        ) {
          return res.status(400).json({
            success: false,
            message: `Experience ${field} must be a string`,
          });
        }
      }

      if (
        item.role !== undefined &&
        item.role.length > 150
      ) {
        return res.status(400).json({
          success: false,
          message: "Role is too long",
        });
      }

      if (
        item.company !== undefined &&
        item.company.length > 200
      ) {
        return res.status(400).json({
          success: false,
          message: "Company is too long",
        });
      }

      if (
        item.duration !== undefined &&
        item.duration.length > 100
      ) {
        return res.status(400).json({
          success: false,
          message: "Duration is too long",
        });
      }

      if (
        item.description !== undefined &&
        item.description.length > 2000
      ) {
        return res.status(400).json({
          success: false,
          message: "Experience description is too long",
        });
      }
    }
  }

  next();
};

module.exports = validateResume;