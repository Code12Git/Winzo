import React, { useState } from "react";
import { publicRequest } from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const ForgotPassword = () => {
	const navigate = useNavigate();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!phoneNumber || !newPassword) {
				setError("Please fill in all fields");
				return;
			}

			const response = await publicRequest.post("/auth/changePassword", {
				phoneNumber,
				newPassword,
			});

			setSuccessMessage(response.data.message);
			setPhoneNumber("");
			setNewPassword("");
			setError("");
			navigate("/");
			toast.success("Password updated successfully");
		} catch (error) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError("Internal Server Error");
			}
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
			<h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			{successMessage && (
				<p className="text-green-500 mb-4">{successMessage}</p>
			)}
			<form onSubmit={handleFormSubmit}>
				<div className="mb-4">
					<label htmlFor="phoneNumber" className="block mb-1">
						Phone Number:
					</label>
					<input
						type="text"
						id="phoneNumber"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						className="w-full border-gray-300 border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
						placeholder="Enter Phone Number"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="newPassword" className="block mb-1">
						New Password:
					</label>
					<input
						type="password"
						id="newPassword"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="w-full border-gray-300 border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
						placeholder="Enter New Password"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
				>
					Reset Password
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
