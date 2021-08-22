import React, { useState, useContext } from "react";
import { Avatar, Paper, Grid, Typography, Container, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { Context } from "../Context";

const initialLoginlState = { email: "", password: "" };
const initialRegisterState = { name: "", email: "", password: "" };

const Login = () => {
	const baseURL = "https://assignment0010.herokuapp.com";
	const [isSignup, setIsSignup] = useState(false);
	const [loginData, setLoginData] = useState(initialLoginlState);
	const [registerData, setRegisterData] = useState(initialRegisterState);
	const { setToken } = useContext(Context);
	const classes = useStyles();
	const history = useHistory();

	const handleChange = (e) => {
		if (isSignup) {
			setRegisterData({ ...registerData, [e.target.name]: e.target.value });
		} else {
			setLoginData({ ...loginData, [e.target.name]: e.target.value });
		}
	};

	const switchMode = () => {
		setIsSignup(!isSignup);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			try {
				fetch(`${baseURL}/api/register`, {
					method: "POST",
					headers: {
						"content-Type": "application/json",
					},
					body: JSON.stringify(registerData),
				})
					.then((res) => res.json())
					.then((res) => {
						const { access_token, message } = res;
						if (message === "success") {
							setToken(access_token);
							history.push("/home");
						} else {
							alert(message);
						}
					});
			} catch (error) {}
		} else {
			try {
				fetch(`${baseURL}/api/login`, {
					method: "POST",
					headers: {
						"content-Type": "application/json",
					},
					body: JSON.stringify(loginData),
				})
					.then((res) => res.json())
					.then((res) => {
						const { access_token, message } = res;
						if (message === "success") {
							setToken(access_token);
							history.push("/home");
						} else {
							alert(message);
						}
					});
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className="loginContainer">
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={4}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							{isSignup && (
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										name="name"
										label="Name"
										onChange={handleChange}
										autoFocus
										xs={6}
										variant="outlined"
										fullWidth
										required
									/>
								</Grid>
							)}
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="email"
									label="Email"
									type="email"
									onChange={handleChange}
									xs={12}
									variant="outlined"
									fullWidth
									autoFocus
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="password"
									label="Password"
									type="password"
									onChange={handleChange}
									xs={12}
									variant="outlined"
									fullWidth
									required
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							{isSignup ? "Sign Up" : "Sign In"}
						</Button>
					</form>
					<Grid container justify="center">
						<Grid item>
							<Button onClick={switchMode}>{isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up "}</Button>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</div>
	);
};

export default Login;
