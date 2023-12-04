import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Withdrawal = () => {
	const [withdrawalAmount, setWithdrawalAmount] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleWithdrawal = () => {
		const amount = parseFloat(withdrawalAmount);

		// Check if all fields are filled
		if (!name || !email || !withdrawalAmount) {
			toast.error("Please fill all fields");
			return;
		}

		if (amount < 2000 || amount > 40000) {
			toast.error("You can only withdraw between 2000 and 40000");
		} else {
			// Process withdrawal logic here
			// For now, displaying a success message
			toast.success(`Withdrawal of ${amount} successful!`);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-24  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="name"
				>
					Name
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="name"
					type="text"
					placeholder="Type your name..."
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="email"
				>
					Email
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="email"
					type="text"
					placeholder="Type your email..."
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="mb-6">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="money"
				>
					Money
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="money"
					type="text"
					placeholder="How much would you like to withdraw?"
					value={withdrawalAmount}
					onChange={(e) => setWithdrawalAmount(e.target.value)}
				/>
			</div>
			<div className="flex items-center justify-between">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
					onClick={handleWithdrawal}
				>
					Withdraw
				</button>
			</div>
		</div>
	);
};

export default Withdrawal;
