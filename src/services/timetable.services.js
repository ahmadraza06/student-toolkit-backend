const Timetable = require("../models/Timetable");
const mongoose = require("mongoose");

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid timetable ID");
    error.statusCode = 400;
    throw error;
  }
};

const createTimetable = async (userId, data) => {
  const timetable = await Timetable.create({
    userId,
    title: data.title,
    schedule: data.schedule,
  });

  return timetable;
};

const getMyTimetables = async (userId) => {
  return Timetable.find({ userId })
    .sort({ updatedAt: -1 });
};

const getTimetableById = async (userId, timetableId) => {
  validateObjectId(timetableId);

  const timetable = await Timetable.findOne({
    _id: timetableId,
    userId,
  });

  if (!timetable) {
    const error = new Error(
      "Timetable not found"
    );
    error.statusCode = 404;
    throw error;
  }

  return timetable;
};

const updateTimetable = async (
  userId,
  timetableId,
  data
) => {
  validateObjectId(timetableId);

  const updateData = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
  }

  if (data.schedule !== undefined) {
    updateData.schedule = data.schedule;
  }

  const timetable =
    await Timetable.findOneAndUpdate(
      {
        _id: timetableId,
        userId,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!timetable) {
    const error = new Error(
      "Timetable not found"
    );
    error.statusCode = 404;
    throw error;
  }

  return timetable;
};

const deleteTimetable = async (
  userId,
  timetableId
) => {
  validateObjectId(timetableId);

  const timetable =
    await Timetable.findOneAndDelete({
      _id: timetableId,
      userId,
    });

  if (!timetable) {
    const error = new Error(
      "Timetable not found"
    );
    error.statusCode = 404;
    throw error;
  }

  return timetable;
};

module.exports = {
  createTimetable,
  getMyTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
};