import Joi from "joi";
import Input from "../models/input";

const addInvoiceController = {
	async add(req, res, next) {
		//validation using Joi
		const addInvoiceSchema = Joi.object({
			invoice_to: Joi.string().required(),
			invoice_date: Joi.date().required(),
			order_date: Joi.date().required(),
			name: Joi.string().required(),
			rate: Joi.number().required(),
			quantity: Joi.number().required(),
		});
		const { error } = addInvoiceSchema.validate(req.body);
		if (error) {
			return next(error);
		}
		const { invoice_to, invoice_date, order_date, name, rate, quantity } = req.body;
		const input = new Input({
			invoice_to,
			invoice_date,
			order_date,
			name,
			rate,
			quantity,
		});
		let result;
		try {
			result = await input.save();
			if (result) {
				res.json({ message: "success" });
			}
		} catch (err) {
			return next(err);
		}
	},
};

export default addInvoiceController;
