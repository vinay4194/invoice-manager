import mongoose from "mongoose";
const Schema = mongoose.Schema;

const inputSchema = new Schema({
	invoice_to: { type: String, required: true },
	invoice_date: { type: Date, required: true },
	order_date: { type: Date, required: true },
	items: { type: [], required: true },
	total: { type: Number },
});
export default mongoose.model("Input", inputSchema, "inputs");
