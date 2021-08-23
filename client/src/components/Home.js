import React, { useContext } from "react";
import { Paper, Grid, Typography, Container, TextField, Button } from "@material-ui/core";
import ShowInvoices from "./ShowInvoices";
import DeleteIcon from "@material-ui/icons/Delete";
import { Context } from "../Context";

import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const Home = () => {
	const baseURL = "https://assignment0010.herokuapp.com";
	const classes = useStyles();

	const { token, invoiceData, setInvoiceData, items, setItems } = useContext(Context);
	const history = useHistory();

	const clear = () => {
		setInvoiceData({
			invoice_to: "",
			invoice_date: "",
			order_date: "",
		});
		setItems([]);
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
						setInvoiceData();
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
							setInvoiceData();
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

	function handleAdd() {
		const values = [...items];
		values.push({ name: "", rate: "", quantity: "" });
		setItems(values);
	}
	function handleRemove(i) {
		const values = [...items];
		values.splice(i, 1);
		setItems(values);
		invoiceData.items = values;
	}

	return (
		<div className={classes.mainContainer}>
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={4}>
					<Typography variant="h5">Create Invoice</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={1}>
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
									value={invoiceData?.invoice_date?.split("T")[0]}
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
									value={invoiceData?.order_date?.split("T")[0]}
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
								<Typography variant="body1">Invoice items</Typography>
							</Grid>

							{items?.map((item, idx) => {
								return (
									<>
										<Grid item xs={4}>
											<TextField
												className={classes.textField}
												InputLabelProps={{ shrink: true }}
												name="name"
												label="Name"
												type="string"
												size="small"
												value={item.name}
												onChange={(e) => {
													const values = [...items];

													values[idx].name = e.target.value;
													setItems(values);
													invoiceData.items = values;
												}}
												xs={12}
												variant="outlined"
												fullWidth
												required
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												className={classes.textField}
												InputLabelProps={{ shrink: true }}
												name="rate"
												label="Rate"
												type="number"
												size="small"
												value={item.rate}
												onChange={(e) => {
													const values = [...items];

													values[idx].rate = e.target.value;
													setItems(values);
													invoiceData.items = items;
												}}
												xs={12}
												variant="outlined"
												fullWidth
												required
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												className={classes.textField}
												InputLabelProps={{ shrink: true }}
												name="quantity"
												label="Qty"
												type="number"
												size="small"
												value={item.quantity}
												onChange={(e) => {
													const values = [...items];

													values[idx].quantity = e.target.value;
													setItems(values);
													invoiceData.items = items;
												}}
												xs={12}
												variant="outlined"
												fullWidth
												required
											/>
										</Grid>
										<Grid xs={2}>
											<Button onClick={() => handleRemove(idx)}>
												<DeleteIcon></DeleteIcon>
											</Button>
										</Grid>
									</>
								);
							})}
							<Grid item xs={12}>
								<Button fullwidth variant="contained" color="primary" onClick={handleAdd}>
									Add Item
								</Button>
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
