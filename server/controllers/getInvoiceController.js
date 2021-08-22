import Input from "../models/input";

const getInvoiceController = {
	async getInvoice(req, res, next) {
		try {
			const inputs = await Input.findOne({ _id: req.params.id });
			if (inputs) {
				res.json(inputs);
			}
		} catch (error) {
			return next(error);
		}
	},
	async getInvoices(req, res, next) {
		try {
			const inputs = await Input.find();
			if (inputs) {
				res.json(inputs);
			}
		} catch (error) {
			return next(error);
		}
	},

	async editInvoice(req, res, next) {
		let { invoice_to, invoice_date, order_date, name, rate, quantity } = req.body;
		let invoice;
		try {
			invoice = await Input.findOneAndUpdate(
				{ _id: req.params.id },
				{
					invoice_to,
					invoice_date,
					order_date,
					name,
					rate,
					quantity,
				},
				{
					new: true,
				}
			);
		} catch (error) {
			return next(err);
		}
		res.status(201).json({ message: "success" });
	},

	async deleteInvoice(req, res, next) {
		try {
			await Input.findByIdAndRemove(req.params.id);

			res.json({ message: "success" });
		} catch (error) {
			return next(error);
		}
	},
};

export default getInvoiceController;
