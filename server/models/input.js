import mongoose from "mongoose";
const Schema = mongoose.Schema;

const inputSchema = new Schema({
	invoice_to: { type: String, required: true },
	invoice_date: { type: Date, required: true },
	order_date: { type: Date, required: true },
	name: { type: String, required: true },
	rate: { type: Number, required: true },
	quantity: { type: Number, required: true },
});
export default mongoose.model("Input", inputSchema, "inputs");
