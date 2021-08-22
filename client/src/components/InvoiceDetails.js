import React, { useContext } from "react";
import { Context } from "../Context";
const InvoiceDetails = () => {
	const { modal, setModal } = useContext(Context);
	return (
		<div className="modal">
			<div className="overlay">
				<div className="modal-content">Hello</div>
			</div>
		</div>
	);
};

export default InvoiceDetails;
