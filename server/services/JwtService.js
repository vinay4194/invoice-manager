import jwt from "jsonwebtoken";
const JWT_SECRET = "mysecret";
class JwtService {
	//Create Token
	static sign(payload, expiry = "1h", secret = JWT_SECRET) {
		return jwt.sign(payload, secret, { expiresIn: expiry });
	}
	//Verify Token
	static verify(token, secret = JWT_SECRET) {
		return jwt.verify(token, secret);
	}
}

export default JwtService;
