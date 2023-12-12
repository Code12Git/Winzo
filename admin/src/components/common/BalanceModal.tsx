"use client";
import React, { useState } from "react";
import { privateRequest } from "@/helpers/axios";
import toast from "react-hot-toast";

type BalanceModalProps = {
	id: number;
	fetchBalance: () => void; // Define the function signature for fetchBalance
};

const BalanceModal = ({ id, fetchBalance }: BalanceModalProps) => {
	const [showModal, setShowModal] = useState(false);
	const [balance, setBalance] = useState(0); // Changed variable name to match state

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBalance(parseInt(event.target.value)); // Updated state function name to setBalance
	};

	const handleSubmit = async () => {
		try {
			await privateRequest.put(`/transaction/${id}/balance`, { balance });
			setShowModal(false);
			toast.success("Balance updated successfully");
			fetchBalance(); // Call the fetchBalance function to refresh data after update
		} catch (error: any) {
			console.error("Error updating balance:", error);
			toast.error("Error updating balance");
		}
	};

	return (
		<>
			<button
				className="bg-gradient-to-r from-cyan-400 to-purple-500 px-2 py-2 text-white rounded-md transition-all hover:scale-105 ease-in-out delay-150 duration-150 hover:from-pink-500 hover:to-yellow-500 "
				type="button"
				onClick={() => setShowModal(true)}
			>
				Update Balance
			</button>
			{showModal ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute w-full h-full bg-black opacity-25"></div>
					<div className="relative z-50 bg-white rounded-lg shadow-lg p-6">
						<h1 className="text-3xl font-semibold text-gray-900 mb-4">
							Change Balance
						</h1>
						<div className="mb-4">
							<input
								type="number"
								className="border border-gray-300 rounded-md px-3 py-2 w-full"
								placeholder="Enter new balance"
								value={balance}
								onChange={handleChange}
							/>
						</div>
						<div className="flex justify-between">
							<button
								className="bg-pink-500 text-white font-bold uppercase px-4 py-2 text-sm rounded hover:bg-pink-600 focus:outline-none shadow hover:shadow-md transition-all duration-300"
								type="button"
								onClick={() => setShowModal(false)}
							>
								Close
							</button>
							<button
								className="bg-green-500 text-white font-bold uppercase px-4 py-2 text-sm rounded hover:bg-green-600 focus:outline-none shadow hover:shadow-md transition-all duration-300"
								type="button"
								onClick={handleSubmit}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default BalanceModal;
