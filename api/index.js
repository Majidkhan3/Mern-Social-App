import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/controller.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const app = express();

// Configure CORS to allow requests from your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Update this to match your frontend's origin
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected");
    // Start the server only after successful MongoDB connection
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Set up routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

console.log("Sign up route is set up");
