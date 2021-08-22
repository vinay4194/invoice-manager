import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";
import User from "../models/user";
import bcrypt from "bcrypt";

const loginController = {
	async login(req, res, next) {
		//Validate
		const loginSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		const { error } = loginSchema.validate(req.body);
		if (error) {
			return next(error);
		}

		let access_token;

		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return next(CustomErrorHandler.invalidCredentials());
		} else {
			bcrypt.compare(req.body.password, user.password, (err, resp) => {
				if (err) {
					return next(err);
				}
				if (!resp) {
					return next(CustomErrorHandler.invalidCredentials());
				} else {
					access_token = JwtService.sign({ _id: user._id });
					res.json({ access_token: access_token, message: "success" });
				}
			});
		}
	},
	async register(req, res, next) {
		//validation using Joi
		const registerSchema = Joi.object({
			name: Joi.string().min(3).max(30).required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		const { error } = registerSchema.validate(req.body);
		if (error) {
			//send to errorHandler middleware
			return next(error);
		}
		//check if user already exists
		try {
			const exist = await User.exists({ email: req.body.email });
			if (exist) {
				return next(CustomErrorHandler.alreadyExists("This email is already registered"));
			}
		} catch (err) {
			return next(err);
		}

		//When there's No ERROR
		const { name, email, password } = req.body;
		const hashedPass = await bcrypt.hash(password, 10);
		//data model
		const user = new User({
			name,
			email,
			password: hashedPass,
		});

		let access_token;
		try {
			//save user to DB
			const result = await user.save();
			//Create token using jwt
			access_token = JwtService.sign({ _id: result._id, role: result.role });
		} catch (err) {
			return next(err);
		}
		res.json({ access_token: access_token, message: "success" });
	},
};

export default loginController;
