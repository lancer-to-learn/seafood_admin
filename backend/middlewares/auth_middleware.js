const AccountDao = require("../dao/AccountDao");
const { verifyToken } = require("../utils/common");
const dotenv = require("dotenv");

const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const isAuth = async (req, res, next) => {
    // Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

	const user = await AccountDao.getAccountByUsername(verified.payload.username);
	req.user = user;

	return next();
}

const isAdmin = async (req, res, next) => {
    // Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

	const user = await AccountDao.getAccountByUsername(verified.payload.username);
	req.user = user;

    if (user.role !== 'admin') {
        return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
    }

	return next();
}

const isBranchAdmin = async (req, res, next) => {
    // Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

	const user = await AccountDao.getAccountByUsername(verified.payload.username);
	req.user = user;

    if (user.role !== 'branch_admin' && user.role !== 'admin') {
        return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
    }

	return next();
}

module.exports = { isAuth, isAdmin, isBranchAdmin };