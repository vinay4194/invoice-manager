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
		let sum = 0;
		let { invoice_to, invoice_date, order_date, items } = req.body;
		items.forEach((item) => (sum = sum + parseInt(item.rate) * parseInt(item.quantity)));
		let invoice;
		try {
			invoice = await Input.findOneAndUpdate(
				{ _id: req.params.id },
				{
					invoice_to,
					invoice_date,
					order_date,
					items,
					total: sum,
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

			res.status(201).json({ message: "success" });
		} catch (error) {
			return next(error);
		}
	},
};

export default getInvoiceController;
