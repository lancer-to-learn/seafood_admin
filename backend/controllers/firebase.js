const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require("../config/firebase-admin.json")),
});

const sendOTPWithFirebase = async (phoneNumber) => {
  try {
    // Tạo session đăng nhập OTP
    const session = await admin.auth().createSessionCookie(phoneNumber, {
      expiresIn: 5 * 60 * 1000, // OTP có hiệu lực 5 phút
    });

    console.log(`OTP gửi thành công cho ${phoneNumber}`);
    return session;
  } catch (error) {
    console.error("Lỗi gửi OTP:", error.message);
    throw new Error("Gửi OTP thất bại");
  }
};

module.exports = { sendOTPWithFirebase };
