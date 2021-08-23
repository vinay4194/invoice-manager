import Joi from "joi";
import Input from "../models/input";

const addInvoiceController = {
	async add(req, res, next) {
		//validation using Joi
		const addInvoiceSchema = Joi.object({
			invoice_to: Joi.string().required(),
			invoice_date: Joi.date().required(),
			order_date: Joi.date().required(),
			items: Joi.array().required(),
		});
		const { error } = addInvoiceSchema.validate(req.body);
		if (error) {
			return next(error);
		}

		let sum = 0;
		const { invoice_to, invoice_date, order_date, items } = req.body;
		items.forEach((item) => (sum = sum + parseInt(item.rate) * parseInt(item.quantity)));

		const input = new Input({
			invoice_to,
			invoice_date,
			order_date,
			items,
			total: sum,
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
