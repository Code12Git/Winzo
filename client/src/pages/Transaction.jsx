import { useState, useRef } from "react";
import { useEffect } from "react";
import { privateRequest } from "../helpers/axios";
import { Cancel } from "@mui/icons-material";
import { formRequest } from "../helpers/axios";
import toast from "react-hot-toast";
const Transaction = () => {
	const [img, setImg] = useState("");
	const fileInputRef = useRef(null);
	const [file, setFile] = useState(null);
	const [transaction, setTransaction] = useState({
		transactionId: "",
		deposit: 0,
	});
	useEffect(() => {
		const fetchQr = async () => {
			const res = await privateRequest.get("/qr");
			setImg(res.data.qrcode);
		};
		fetchQr();
	}, []);

	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		const parsedValue = name === "deposit" ? parseInt(value, 10) : value || 0;
		setTransaction((prev) => ({ ...prev, [name]: parsedValue }));
	};

	const clickChangeHandler = async (e) => {
		e.preventDefault();

		try {
			if (!transaction.transactionId || !transaction.deposit) {
				toast.error("Please provide both Transaction ID and Deposit.");
				return;
			}

			if (transaction.deposit < 500) {
				toast.error("Deposit amount cannot be less than 500");
				return;
			}

			if (!file) {
				toast.error("Please upload a screenshot.");
				return;
			}

			const screenshotData = new FormData();
			screenshotData.append("screenshot", file);
			await formRequest.post("/screenshot", screenshotData);
			toast.success("Deposit Request sent successfully");

			await privateRequest.post("/transaction", transaction);
		} catch (error) {
			toast.error("Error uploading screenshot or transaction");
		}
	};


	return (
		<div className="flex flex-wrap justify-evenly">
			<div className="text-center p-12">
				<h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-cyan-800 bg-clip-text text-transparent">Paytm -: QR Code</h1>
				<img
					src={img}
					alt="Paytm QR Code"
					className="w-76 h-76 rounded-md mx-auto"
				/>
			</div>
			<div className="flex flex-col gap-8 bg-gradient-to-r from-blue-800 mt-36 mb-4 to-slate-600 p-8  h-96 rounded-lg">
				{/* Transaction Id */}
				<div className="flex flex-col gap-2">
					<label className="font-bold text-white">Transaction Id:</label>
					<input
						className="p-2 border border-white font-bold rounded-lg"
						type="text"
						name="transactionId"
						onChange={inputChangeHandler}
						value={transaction.transactionId}
						placeholder="Transaction ID"
					/>
				</div>

				{/* Deposit */}
				<div className="flex flex-col gap-2">
					<label className="font-bold text-white">Deposit:</label>
					<input
						className="p-2 border border-white font-bold rounded-lg"
						type="number"
						name="deposit"
						onChange={inputChangeHandler}
						value={transaction.deposit}
						placeholder="Deposit"
					/>
				</div>

				{/* Uploaded File Preview */}
				{file && (
					<div className="w-64 relative">
						<img
							className="h-48 w-full rounded-lg object-cover"
							src={URL.createObjectURL(file)}
							alt="Preview"
						/>
						<Cancel
							className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-100 p-1 cursor-pointer"
							onClick={() => setFile(null)}
						/>
					</div>
				)}

				{/* File Input Form */}
				<form className="flex flex-col items-center gap-4" onSubmit={clickChangeHandler}>
					<label
						htmlFor="file"
						className="file-input-label cursor-pointer hover:text-red-400 font-bold text-xl text-white"
					>
						Add Screenshot
						<input
							type="file"
							id="file"
							className="file-input hidden"
							ref={fileInputRef}
							onChange={(e) => e.target.files && setFile(e.target.files[0])}
						/>
					</label>

					{/* Submit Button */}
					<button
						type="submit"
						className="bg-blue-500 hover:scale-105 text-white font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
					>
						Submit
					</button>
				</form>
			</div>


		</div>
	);
};

export default Transaction;
