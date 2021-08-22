import express from "express";
import mongoose from "mongoose";

import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
const cors = require("cors");

const app = express();
const APP_PORT = process.env.PORT || 5000;
const DB_URL = "";

//DB Connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
	console.log("DB Connected...");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
//Routes
app.use("/api", routes);

//Middleware
app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`Server running on Port: ${APP_PORT}`));
