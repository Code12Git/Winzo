"use client";
import React, { useEffect, useState } from "react";
import { privateRequest } from "@/helpers/axios";
import { TransactionDetails } from "@/types/types";

const Transaction = () => {
	const [transactions, setTransactions] = useState<TransactionDetails[] | null>(
		null
	);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await privateRequest.get("/transaction");
				if (response.data && response.data.transactions) {
					setTransactions(response.data.transactions);
				}
			} catch (error) {
				console.error("Error fetching transactions:", error);
			}
		};

		fetchTransactions();
	}, []);

	const formatDateTime = (timestamp: string) => {
		const date = new Date(timestamp);
		const formattedDate = date.toLocaleDateString();
		const formattedTime = date.toLocaleTimeString();
		return `${formattedDate} ${formattedTime}`;
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">Transaction Details</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{transactions && transactions.length > 0 ? (
					transactions.map((transaction) => (
						<div
							key={transaction.id}
							className="bg-white shadow-md p-4 rounded-md"
						>
							<h2 className="text-xl font-bold mb-2">
								Transaction ID: {transaction.transactionId}
							</h2>
							<p>Balance: {transaction.balance}</p>
							<p>Deposit: {transaction.deposit}</p>
							<p>Withdrawal: {transaction?.withdrawal}</p>
							<p>Bet Amount: {transaction.betAmount}</p>
							<div className="mt-4">
								<h3 className="text-lg font-semibold">User Details</h3>
								<p>User ID: {transaction.user.id}</p>
								<p>Name: {transaction.user.name}</p>
								<p>Email: {transaction.user.email}</p>
								<p>Username: {transaction.user.username}</p>
							</div>
							<p>CreatedAt: {formatDateTime(transaction.createdAt)}</p>
						</div>
					))
				) : (
					<p>No transactions available.</p>
				)}
			</div>
		</div>
	);
};

export default Transaction;
