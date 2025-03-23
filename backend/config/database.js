const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("seafood", "root", "27072000", {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: console.log, // Tắt logging SQL query
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL successfully.");
    const [databases] = await sequelize.query("SELECT DATABASE();");
    console.log("🛠️ Đang kết nối đến database:", databases[0]["DATABASE()"]);
    const [results] = await sequelize.query("SHOW TABLES;");
    console.log("📋 Danh sách bảng:", results);
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
  }
}

module.exports = { sequelize, connectDB };
