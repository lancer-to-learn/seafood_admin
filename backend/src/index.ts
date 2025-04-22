import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, connectDB } from "./config/database";
import { Account } from "./models"; // Nếu không dùng trực tiếp, có thể bỏ
import authRoutes from "./routes/auth";
import branchRoutes from "./routes/branch";
import accountRoutes from "./routes/account";
import productRoutes from "./routes/product";
import { isAdmin } from "./middlewares/auth_middleware";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect DB
connectDB().then(() => {
  sequelize.sync({ force: false }).then(() => {
    console.log("✅ Database synchronized.");
  });
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/branch", isAdmin, branchRoutes);
app.use("/api/account", isAdmin, accountRoutes);
app.use("/api/product", isAdmin, productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
