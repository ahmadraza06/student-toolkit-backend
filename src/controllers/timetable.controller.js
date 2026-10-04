
const timetableService = require(
  "../services/timetable.services"
);

async function createTimetable(req, res, next) {
  
  try {
    const timetable = await timetableService.createTimetable(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: { timetable },
    });
  } catch (error) {
    next(error);
  }
}

async function getTimetables(req, res, next) {
  try {
    const timetables = await timetableService.getMyTimetables(
      req.user.id
    );
    

    res.status(200).json({
      success: true,
      data: { timetables },
    });
  } catch (error) {
    next(error);
  }
}

async function getTimetableById(req, res, next) {
  try {
    const timetable =
      await timetableService.getTimetableById(
        req.user.id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: { timetable },
    });
  } catch (error) {
    next(error);
  }
}

async function updateTimetable(req, res, next) {
  try {
    const timetable =
      await timetableService.updateTimetable(
        req.user.id,
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: { timetable },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTimetable(req, res, next) {
  try {
    await timetableService.deleteTimetable(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Timetable deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTimetable,
  getTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
};
