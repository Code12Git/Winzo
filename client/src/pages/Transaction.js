import React, { useState } from "react";
import { useEffect } from "react";
import { privateRequest } from "../helpers/axios";
const Transaction = () => {
	const [img, setImg] = useState("");
	useEffect(() => {
		const fetchQr = async () => {
			const res = await privateRequest.get("/qr");
			setImg(res.data.qrcode);
		};
		fetchQr();
	}, []);
	return (
		<div class="flex justify-center items-center">
			<div class="text-center">
				<h1 class="text-3xl font-bold mb-4">Paytm -: QR Code</h1>
				<img
					src={img}
					alt="Paytm QR Code"
					className="w-96 h-96"
					class="mx-auto"
				/>
			</div>
		</div>
	);
};

export default Transaction;
