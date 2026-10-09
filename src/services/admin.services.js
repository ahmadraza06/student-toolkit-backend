

const User = require("../models/User");
const Resume = require("../models/Resume.js");
const Timetable = require("../models/Timetable.js");

const getAdminStats = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    totalUsers,
    totalStudents,
    totalAdmins,
    totalResumes,
    totalTimetables,
    newUsersLast7Days,
    recentUsers,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "admin" }),
    Resume.countDocuments(),
    Timetable.countDocuments(),
    User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    }),
    User.find()
      .select("name role createdAt")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  return {
    users: {
      total: totalUsers,
      students: totalStudents,
      admins: totalAdmins,
      newLast7Days: newUsersLast7Days,
    },
    content: {
      resumes: totalResumes,
      timetables: totalTimetables,
    },
    recentRegistrations: recentUsers,
    generatedAt: new Date(),
  };
};

module.exports = {
  getAdminStats,
};
