import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
import { Context } from "./Context";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
function App() {
	const [token, setToken] = useState();
	const [items, setItems] = useState([{ name: "", rate: "", quantity: "" }]);
	const [invoiceData, setInvoiceData] = useState({
		invoice_to: "",
		invoice_date: "",
		order_date: "",
		items: [],
	});

	return (
		<Router>
			<Context.Provider value={{ token, setToken, invoiceData, setInvoiceData, items, setItems }}>
				<div className="container">
					<NavBar />

					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/home" component={Home} />
					</Switch>
				</div>
			</Context.Provider>
		</Router>
	);
}

export default App;
