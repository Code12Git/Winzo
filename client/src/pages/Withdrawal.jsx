import  { useState } from "react";
import { toast } from "react-hot-toast";
import { SiPaytm } from "react-icons/si";
import DepositModal from "../components/modals/Deposit";
const Withdrawal = () => {
	const [withdrawalAmount, setWithdrawalAmount] = useState("");
	const [bankName, setBankName] = useState("");
	const [accountMemberName, setAccountMemberName] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [ifscCode, setIfscCode] = useState("");
	const [showModal, setShowModal] = useState(false);

	const [upiId, setUpiId] = useState("");
	const handleWithdrawal = () => {
		const amount = parseFloat(withdrawalAmount);

		if (
			!bankName ||
			!accountMemberName ||
			!accountNumber ||
			!ifscCode ||
			!withdrawalAmount
		) {
			toast.error("Please fill all fields");
			return;
		}

		if (amount < 2000 || amount > 40000) {
			toast.error("You can only withdraw between 2000 and 40000");
		} else {
			setShowModal(true);
		}
	};

	return (
		<>
			<div className="max-w-md mx-auto mt-24  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<DepositModal show={showModal} onClose={() => setShowModal(false)} />
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="money"
					>
						Money
					</label>
					<input
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="money"
						type="number"
						placeholder="How much would you like to withdraw?"
						value={withdrawalAmount}
						onChange={(e) => setWithdrawalAmount(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="bankName"
					>
						Bank Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="bankName"
						type="text"
						placeholder="Enter Bank Name"
					value={bankName}
						onChange={(e) => setBankName(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="bankName"
					>
						Bank Account Member Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="bankName"
						type="text"
						value={accountMemberName}
						onChange={(e) => setAccountMemberName(e.target.value)}
						placeholder="Enter Bank Account Member Name"
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="accountNumber"
					>
						Account Number
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="accountNumber"
						type="number"
						value={accountNumber}
						onChange={(e) => setAccountNumber(e.target.value)}
						placeholder="Enter Account Number"
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="accountNumber"
					>
						IFSC CODE
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="accountNumber"
						type="text"
						value={ifscCode}
						onChange={(e) => setIfscCode(e.target.value)}
						placeholder="Enter  IFSC Code"
					/>
				</div>
				{/* OR label */}
				<h1 className="text-center mt-6 mb-4 text-gray-700 font-bold">OR</h1>

				{/* UPI ID field */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="upiId"
					>
						Enter your UPI ID
					</label>
					<input
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="upiId"
						type="text"
						value={upiId}
						onChange={(e) => setUpiId(e.target.value)}
						placeholder="Enter UPI ID"
					/>
				</div>
				{/* Withdraw button */}
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
			{/* Paytm phone button with icons */}
			<div className="flex items-center justify-center mt-4">
				<button className="flex items-center justify-center p-2 bg-teal-500 text-white rounded-md">
					<SiPaytm className="w-6 h-6 text-blue-500 mr-2" />
					Paytm
				</button>
			</div>
		</>
	);
};

export default Withdrawal;
