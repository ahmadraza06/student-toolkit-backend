const isPlainObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

const isString = (value) =>
  typeof value === "string";

const isPositiveNumber = (value) =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value > 0;

const validateTimetable = (req, res, next) => {
  const data = req.body;

  if (!isPlainObject(data)) {
    return res.status(400).json({
      success: false,
      message: "Request body must be an object",
    });
  }

  const allowedFields = ["title", "schedule"];

  const invalidFields = Object.keys(data).filter(
    (key) => !allowedFields.includes(key)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid timetable fields",
    });
  }

  // --------------------------------
  // TITLE
  // --------------------------------

  if (data.title !== undefined) {
    if (
      !isString(data.title) ||
      data.title.trim().length < 2 ||
      data.title.trim().length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 2 and 100 characters",
      });
    }
  }

  // --------------------------------
  // SCHEDULE
  // --------------------------------

  if (data.schedule !== undefined) {
    if (!isPlainObject(data.schedule)) {
      return res.status(400).json({
        success: false,
        message: "Schedule must be an object",
      });
    }

    const allowedScheduleFields = [
      "studyHours",
      "subjects",
      "timetable",
    ];

    const invalidScheduleFields = Object.keys(
      data.schedule
    ).filter(
      (key) => !allowedScheduleFields.includes(key)
    );

    if (invalidScheduleFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid schedule fields",
      });
    }

    // --------------------------------
    // STUDY HOURS
    // --------------------------------

    if (data.schedule.studyHours !== undefined) {
      if (
        !isPositiveNumber(
          Number(data.schedule.studyHours)
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Study hours must be a positive number",
        });
      }

      if (
        Number(data.schedule.studyHours) > 24
      ) {
        return res.status(400).json({
          success: false,
          message: "Study hours cannot exceed 24",
        });
      }
    }

    // --------------------------------
    // SUBJECTS
    // --------------------------------

    if (data.schedule.subjects !== undefined) {
      if (!Array.isArray(data.schedule.subjects)) {
        return res.status(400).json({
          success: false,
          message: "Subjects must be an array",
        });
      }

      if (data.schedule.subjects.length > 30) {
        return res.status(400).json({
          success: false,
          message: "Maximum 30 subjects allowed",
        });
      }

      for (const subject of data.schedule.subjects) {
        if (!isPlainObject(subject)) {
          return res.status(400).json({
            success: false,
            message: "Invalid subject",
          });
        }

        const allowedSubjectFields = [
          "name",
          "hours",
          "priority",
        ];

        const invalidSubjectFields = Object.keys(
          subject
        ).filter(
          (key) =>
            !allowedSubjectFields.includes(key)
        );

        if (invalidSubjectFields.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid subject fields",
          });
        }

        if (
          !isString(subject.name) ||
          subject.name.trim().length < 1 ||
          subject.name.length > 100
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid subject name",
          });
        }

        if (
          !isPositiveNumber(Number(subject.hours))
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Subject hours must be a positive number",
          });
        }

        if (
          Number(subject.hours) > 24
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Subject hours cannot exceed 24",
          });
        }

        if (
          subject.priority !== undefined &&
          !["High", "Medium", "Low"].includes(
            subject.priority
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Priority must be High, Medium or Low",
          });
        }
      }
    }

    // --------------------------------
    // GENERATED TIMETABLE
    // --------------------------------

    if (data.schedule.timetable !== undefined) {
      if (!Array.isArray(data.schedule.timetable)) {
        return res.status(400).json({
          success: false,
          message: "Timetable must be an array",
        });
      }

      if (data.schedule.timetable.length > 50) {
        return res.status(400).json({
          success: false,
          message: "Maximum 50 timetable entries allowed",
        });
      }

      for (const item of data.schedule.timetable) {
        if (!isPlainObject(item)) {
          return res.status(400).json({
            success: false,
            message: "Invalid timetable entry",
          });
        }

        const allowedFields = [
          "name",
          "priority",
          "hours",
        ];

        const invalidFields = Object.keys(item).filter(
          (key) => !allowedFields.includes(key)
        );

        if (invalidFields.length > 0) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid timetable entry fields",
          });
        }

        if (
          !isString(item.name) ||
          item.name.trim().length < 1 ||
          item.name.length > 100
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid timetable entry name",
          });
        }

        if (
          !isPositiveNumber(Number(item.hours))
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Timetable hours must be positive",
          });
        }

        if (
          item.priority !== undefined &&
          !["High", "Medium", "Low"].includes(
            item.priority
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid timetable priority",
          });
        }
      }
    }
  }

  // --------------------------------
  // REQUIRED FIELDS FOR POST
  // --------------------------------

  if (req.method === "POST") {
    if (!data.title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!data.schedule) {
      return res.status(400).json({
        success: false,
        message: "Schedule is required",
      });
    }
  }

  next();
};

module.exports = validateTimetable;