
const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resume.routes");
const timetableRoutes = require(
  "./routes/timetable.routes"
);
const {authLimiter,apiLimiter} = require("./middlewares/rateLimiter")
const helmet = require("helmet");

const app = express();

// Middleware
app.use(helmet());

const allowedOrigins = [
  process.env.CLIENT_URL
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true,
  })
);

app.use(express.json({limit:"100kb"}));
app.use(express.urlencoded({extended: true,limit: "100kb",}));
app.use("/api/auth",authLimiter);
app.use("/api",apiLimiter)

// Health-check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Toolkit API is running",
  });
});
app.use("/api/auth",authRoutes);
app.use("/api/resumes",resumeRoutes);
app.use("/api/timetables", timetableRoutes);


app.use(notFound);
app.use(errorHandler);


module.exports = app;