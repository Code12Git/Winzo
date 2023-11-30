"use client";
import React, { useRef, useState } from "react";

import { Cancel } from "@mui/icons-material";
import { formRequest } from "@/helpers/axios";
import toast from "react-hot-toast";

const Qr: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);

	const clickChangeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			const data = new FormData();
			data.append("qrcode", file);

			try {
				const res = await formRequest.post("/qr", data);
				toast.success("QRCode changed successfully");
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
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

			<form
				className="mt-8 flex flex-col items-center gap-4"
				onSubmit={clickChangeHandler}
			>
				<label
					htmlFor="file"
					className="file-input-label cursor-pointer hover:text-red-400"
				>
					Add Qr Code
					<input
						type="file"
						id="file"
						className="file-input hidden"
						ref={fileInputRef}
						onChange={(e) => e.target.files && setFile(e.target.files[0])}
					/>
				</label>
				<button
					type="submit"
					className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Qr;
