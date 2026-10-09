

const adminService = require("../services/admin.services");

const getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getAdminStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};