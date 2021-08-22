import express from "express";
const router = express.Router();
import loginController from "../controllers/loginController";
import addInvoiceController from "../controllers/addInvoiceController";
import getInvoiceController from "../controllers/getInvoiceController";
import auth from "../middlewares/auth";

router.post("/login", loginController.login);
router.post("/register", loginController.register);
router.post("/add_invoice", auth, addInvoiceController.add);
router.get("/get_invoices", getInvoiceController.getInvoices);
router.get("/get_invoice/:id", getInvoiceController.getInvoice);
router.put("/edit_invoice/:id", auth, getInvoiceController.editInvoice);
router.post("/delete_invoice/:id", auth, getInvoiceController.deleteInvoice);

export default router;
