import React, { useContext } from "react";
import { Paper, Grid, Typography, Container, TextField, Button } from "@material-ui/core";
import ShowInvoices from "./ShowInvoices";
import { Context } from "../Context";

import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const Home = () => {
	const baseURL = "https://assignment0010.herokuapp.com";
	const classes = useStyles();

	const { token, invoiceData, setInvoiceData } = useContext(Context);
	const history = useHistory();

	const clear = () => {
		setInvoiceData({
			invoice_to: "",
			invoice_date: "",
			order_date: "",
			name: "",
			rate: "",
			quantity: "",
		});
	};
	//Create Invoice
	const handleSubmit = (e) => {
		e.preventDefault();

		//if there is an _id means its an update request
		if (invoiceData._id) {
			fetch(`${baseURL}/api/edit_invoice/${invoiceData._id}`, {
				method: "PUT",
				headers: {
					"content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(invoiceData),
			})
				.then((res) => res.json())
				.then((res) => {
					const { message } = res;
					if (message === "success") {
						alert("Invoice updated successfully");
					} else if (message === "unAuthorized") {
						alert("unAuthorized, Please Login");
						history.push("/");
					} else {
						alert(message);
					}
				});
		} else {
			try {
				fetch(`${baseURL}/api/add_invoice`, {
					method: "POST",
					headers: {
						"content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(invoiceData),
				})
					.then((res) => res.json())
					.then((res) => {
						const { message } = res;
						if (message === "success") {
							alert("Invoice added successfully");
						} else if (message === "unAuthorized") {
							alert("unAuthorized, Please Login");
							history.push("/");
						} else {
							alert(message);
						}
					});
			} catch (error) {
				console.log(error);
			}
		}
		clear();
	};
	return (
		<div className={classes.mainContainer}>
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={4}>
					<Typography variant="h5">Create Invoice</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									InputLabelProps={{ shrink: true }}
									className={classes.textField}
									name="invoice_to"
									label="Invoice to"
									value={invoiceData?.invoice_to}
									onChange={(e) => {
										setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
									}}
									xs={12}
									variant="outlined"
									fullWidth
									autoFocus
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									InputLabelProps={{ shrink: true }}
									className={classes.textField}
									name="invoice_date"
									label="Invoice Date"
									type="date"
									value={invoiceData?.invoice_date.split("T")[0]}
									onChange={(e) => {
										setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
									}}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									InputLabelProps={{ shrink: true }}
									className={classes.textField}
									name="order_date"
									label="Order Date"
									type="date"
									value={invoiceData?.order_date.split("T")[0]}
									onChange={(e) => {
										setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
									}}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="body1" align="center">
									Invoice items
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="name"
									label="Name"
									type="string"
									value={invoiceData?.name}
									onChange={(e) => {
										setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
									}}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									className={classes.textField}
									name="rate"
									label="Rate"
									type="string"
									value={invoiceData?.rate}
									onChange={(e) => {
										setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
									}}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									className={classes.textField}
									name="quantity"
									label="Quantity"
									type="string"
									value={invoiceData?.quantity}
									onChange={(e) => {
										setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
									}}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Submit
						</Button>
					</form>
				</Paper>
			</Container>
			<ShowInvoices />
		</div>
	);
};

export default Home;
