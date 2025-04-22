const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const { Account } = require("../models");
const randToken = require('rand-token');
const AccountDao = require("../dao/AccountDao");
const { generateToken, decodeToken } = require("../utils/common");
const { sendSMS } = require("./vonage");
require("dotenv").config();

// Cấu hình Twilio
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);



// Cấu hình transporter gửi email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "docaominhchik17.125@gmail.com",
    pass: "totnghiepdaihoc2024",
  },
});

// Gửi email xác minh
const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: "docaominhchik17.125@gmail.com",
    to: email,
    subject: "Xác minh tài khoản của bạn",
    html: `<p>Mã xác minh của bạn là: <b>${verificationCode}</b></p>`,
  };
  await transporter.sendMail(mailOptions);
};

// Gửi OTP qua SMS
const sendOTP = async (phone, otp) => {
  await client.messages.create({
    body: `Mã OTP xác minh tài khoản của bạn là: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Thiếu số điện thoại hoặc OTP" });

    const user = await verifyOTPWithFirebase(phone, otp);
    res.json({ message: "Xác minh thành công", user });
  } catch (error) {
    res.status(400).json({ message: "OTP không hợp lệ", error: error.message });
  }
};

// Đăng ký tài khoản
const register = async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;
    console.log(phone)
    // Kiểm tra email hoặc số điện thoại đã tồn tại chưa
    const existingUser = await Account.findOne({ 
      where: { phone: phone }
    });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Số điện thoại đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const newUser = await Account.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role,
      status: "inactive",
      otpCode,
      otpExpiresAt,
    });

    // Gửi email và OTP SMS
    // await sendOTP(phone, otpCode);
    await sendSMS(otpCode, phone);

    res.status(201).json({
      message: "Đăng ký thành công, vui lòng kiểm tra SMS để xác minh tài khoản.",
      userId: newUser.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xác minh tài khoản qua email
const verifyByEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await Account.findOne({ where: { email, verificationCode: code } });

    if (!user) {
      return res.status(400).json({ message: "Mã xác minh không hợp lệ." });
    }

    user.status = "active";
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ message: "Xác minh email thành công, bạn có thể đăng nhập." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xác minh tài khoản qua số điện thoại
const verifyByPhone = async (req, res) => {
  try {
    const { phone, code } = req.body;
    const user = await Account.findOne({ where: { phone, otpCode: code } });

    if (!user) {
      return res.status(400).json({ message: "Mã OTP không hợp lệ." });
    }

    user.status = "active";
    user.otpCode = null;
    await user.save();

    res.status(200).json({ message: "Xác minh số điện thoại thành công, bạn có thể đăng nhập." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

	const user = await AccountDao.getAccountByUsername(username);
	if (!user) {
		return res.status(401).send('Tên đăng nhập không tồn tại.');
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).send('Mật khẩu không chính xác.');
	}

	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const dataForAccessToken = {
		username: user.username,
	};
	const accessToken = await generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.send('Đăng nhập không thành công, vui lòng thử lại.');
	}

	let refreshToken = randToken.generate(64); // tạo 1 refresh token ngẫu nhiên
	if (!user.refreshToken) {
		// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
		await AccountDao.updateRefreshToken(user.username, refreshToken);
	} else {
		// Nếu user này đã có refresh token thì lấy refresh token đó từ database
		refreshToken = user.refreshToken;
	}

	return res.json({
		msg: 'Đăng nhập thành công.',
		accessToken,
		refreshToken,
		user,
	});
};

const refreshToken = async (req, res) => {
  // Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('Không tìm thấy access token.');
	}

	// Lấy refresh token từ body
	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Không tìm thấy refresh token.');
	}

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

	// Decode access token đó
	const decoded = await decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Access token không hợp lệ.');
	}

	const { username} = decoded.payload; // Lấy username từ payload

	const user = await AccountDao.getAccountByUsername(username);
	if (!user) {
		return res.status(401).send('User không tồn tại.');
	}

  if (user.role != 'admin') {
    return res.status(401).send('User không có đủ quyền hạn.');
  }

	if (refreshTokenFromBody !== user.refreshToken) {
		return res.status(400).send('Refresh token không hợp lệ.');
	}

	// Tạo access token mới
	const dataForAccessToken = {
		username: username
	};

	const accessToken = await generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Tạo access token không thành công, vui lòng thử lại.');
	}
	return res.json({
		accessToken,
    user
	});
}


module.exports = {
  register,
  verifyByEmail,
  verifyByPhone,
  verifyOTP,
  login,
  sendVerificationEmail,
  sendOTP,
  refreshToken
};
