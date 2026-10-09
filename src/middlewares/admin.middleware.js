

const User = require("../models/User");

const adminOnly = async (req, res, next) => {
  try {
    // protect middleware must run before this middleware.
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Load the current role from the database.
    // Do not trust a role sent by the frontend.
    const user = await User.findById(req.user.id)
      .select("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    // Attach the verified role for downstream handlers.
    req.user.role = user.role;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  adminOnly,
};