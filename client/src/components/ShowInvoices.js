import React, { useEffect, useState, useContext } from "react";
import { Paper, Typography, Container, Button, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { Context } from "../Context";

const ShowInvoices = () => {
	const baseURL = "https://assignment0010.herokuapp.com";
	const [inputData, setInputData] = useState([]);
	const [invoiceInfo, setInvoiceInfo] = useState([]);
	const [modal, setModal] = useState(false);
	const classes = useStyles();
	const history = useHistory();
	const { token, invoiceData, setInvoiceData, setItems } = useContext(Context);

	useEffect(() => {
		fetch(`${baseURL}/api/get_invoices`)
			.then((res) => res.json())
			.then((res) => {
				setInputData(res);
			});
	}, [invoiceData]);

	const toggleModal = () => {
		setModal(!modal);
	};

	//Delete Invoice
	const handleDelete = (id) => {
		fetch(`${baseURL}/api/delete_invoice/${id}`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				const { message } = res;
				if (message === "success") {
					alert("Invoice deleted successfully");
					setInvoiceData({
						invoice_to: "",
						invoice_date: "",
						order_date: "",
						items: [],
					});
				} else if (message === "unAuthorized") {
					alert("unAuthorized, Please Login!");
					history.push("/");
				} else {
					alert(message);
				}
			});
	};

	const handleEdit = (id) => {
		fetch(`${baseURL}/api/get_invoice/${id}`)
			.then((res) => res.json())
			.then((res) => {
				setInvoiceData(res);
				setItems(res.items);
			});
	};

	//Show More Info of an Invoice
	const handleInfo = (id) => {
		fetch(`${baseURL}/api/get_invoice/${id}`)
			.then((res) => res.json())
			.then((res) => {
				setInvoiceInfo(res);
			});
	};

	return (
		<Container component="main" maxWidth="md">
			<Paper className={classes.paper} elevation={4}>
				<Typography variant="h5">Invoices</Typography>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Invoice To</TableCell>
								<TableCell align="center">Invoice Date</TableCell>
								<TableCell align="center">Invoice Total</TableCell>
								<TableCell align="center">More Info</TableCell>
								<TableCell align="center">Edit</TableCell>
								<TableCell align="center">Delete</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{inputData?.map((item) => (
								<TableRow key={item._id}>
									{/* <TableCell component="th" scope="row">
										{row.name}
									</TableCell> */}

									<TableCell align="center">{item.invoice_to}</TableCell>
									<TableCell align="center">{item.invoice_date.split("T")[0]}</TableCell>
									<TableCell align="center">{item.total}</TableCell>

									<TableCell align="center">
										{
											<Button
												onClick={() => {
													toggleModal();
													handleInfo(item._id);
												}}
											>
												{<InfoOutlinedIcon />}
											</Button>
										}
									</TableCell>
									<TableCell align="center">
										{
											<Button
												onClick={() => {
													handleEdit(item._id);
												}}
											>
												{<EditIcon />}
											</Button>
										}
									</TableCell>
									<TableCell align="center">
										{
											<Button
												onClick={() => {
													handleDelete(item._id);
												}}
											>
												{<DeleteIcon />}
											</Button>
										}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{modal && (
				<div className="modal">
					<div className="overlay">
						<div className="modal-content">
							<Grid container spacing={3}>
								<Grid item xs={5}>
									<Typography variant="body1">Invoice To:</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography variant="body1">{invoiceInfo.invoice_to}</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography variant="body1">Invoice Date:</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography variant="body1">{invoiceInfo.invoice_date?.split("T")[0]}</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography variant="body1">Order Date:</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography variant="body1">{invoiceInfo.order_date?.split("T")[0]}</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="h6">Items</Typography>
								</Grid>
								{invoiceInfo.items?.map((item) => {
									return (
										<Grid container xs={6}>
											<Grid item xs={5}>
												<Typography variant="body1">Name: </Typography>
											</Grid>
											<Grid item xs={5}>
												<Typography variant="body1">{item.name}</Typography>
											</Grid>
											<Grid item xs={5}>
												<Typography variant="body1">Rate:</Typography>
											</Grid>
											<Grid item xs={5}>
												<Typography variant="body1">{item.rate}</Typography>
											</Grid>
											<Grid item xs={5}>
												<Typography variant="body1">Quantity:</Typography>
											</Grid>
											<Grid item xs={5}>
												<Typography variant="body1" gutterBottom>
													{item.quantity}
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography variant="body1" gutterBottom></Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography variant="body1" gutterBottom></Typography>
											</Grid>
										</Grid>
									);
								})}
							</Grid>
							<button onClick={toggleModal} className="close-modal">
								CLOSE
							</button>
						</div>
					</div>
				</div>
			)}
		</Container>
	);
};

export default ShowInvoices;
