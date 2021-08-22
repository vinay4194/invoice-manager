class CustomErrorHandler extends Error {
	constructor(status, msg) {
		super();
		this.status = status;
		this.message = msg;
	}

	static alreadyExists(message) {
		return new CustomErrorHandler(409, message);
	}
	static invalidCredentials(message = "Invalid Credentials") {
		return new CustomErrorHandler(401, message);
	}
	static unAuthorized(message = "unAuthorized") {
		return new CustomErrorHandler(401, message);
	}
}
export default CustomErrorHandler;
