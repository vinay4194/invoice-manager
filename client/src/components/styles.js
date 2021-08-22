import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(4),
		background: "linear-gradient(to right bottom, rgb(237, 248, 255,0.4), rgb(237, 248, 255,0.7))",
		backdropFilter: "blur(0.5rem)",
		borderRadius: "15px",
	},
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(2),
		},
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3),
	},
	textField: {
		marginBottom: "20px",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	mainContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},
}));
