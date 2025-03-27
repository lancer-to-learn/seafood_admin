const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/database");
const { Account } = require("./models");
const authRoutes = require("./routes/auth");
const branchRoutes = require("./routes/branch");
const accountRoutes = require("./routes/account");
const { isAdmin } = require("./middlewares/auth_middleware.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép React frontend truy cập
    credentials: true, // Cho phép gửi cookie hoặc token
  })
);

// Kết nối database và đồng bộ model
connectDB().then(() => {
  sequelize.sync({ force: false }).then(() => {
    console.log("✅ Database synchronized.");
  });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/branch", isAdmin, branchRoutes);
app.use("/api/account", isAdmin, accountRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
