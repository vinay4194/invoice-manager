import CustomErrorHandler from "../services/CustomErrorHandler";

import JwtService from "../services/JwtService";
const auth = async (req, res, next) => {
	let authHeader = req.headers.authorization;
	//No AuthHeader present
	if (!authHeader) {
		return next(CustomErrorHandler.unAuthorized());
	}
	const token = authHeader.split(" ")[1];
	//Verify Token
	try {
		JwtService.verify(token);
		next();
	} catch (err) {
		return next(CustomErrorHandler.unAuthorized());
	}
};

export default auth;
