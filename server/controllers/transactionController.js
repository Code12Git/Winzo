import prisma from "../db/conn.js";

// Create Transaction
export const createTransaction = async (req, res) => {
	const { deposit, transactionId, withdrawal, betAmount } = req.body;
	const MIN_DEPOSIT_AMOUNT = 300;

	try {
		if (!deposit || !transactionId) {
			return res.status(400).json({
				message: "Please provide all fields (deposit, transactionId).",
				success: false,
			});
		}

		if (deposit < MIN_DEPOSIT_AMOUNT) {
			return res.status(400).json({
				message: "Deposit amount should not be less than 300.",
				success: false,
			});
		}

		const transaction = await prisma.transaction.create({
			data: {
				deposit,
				transactionId,
				betAmount: betAmount || 0,
				withdrawal: withdrawal || 0,
				user: {
					connect: {
						id: req.user.id,
					},
				},
			},
		});

		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
			select: {
				id: true,
				email: true,
				name: true,
				username: true,
			},
		});

		return res.status(201).json({
			message: "Transaction created successfully",
			transaction,
			user,
			success: true,
		});
	} catch (err) {
		console.error("Error creating transaction:", err);
		return res.status(500).json({
			message: "Error creating transaction",
			error: err.message,
			success: false,
		});
	}
};

// Get All Transactions
export const getAllTransactions = async (req, res) => {
	try {
		const transactionsWithUsers = await prisma.transaction.findMany({
			select: {
				id: true,
				deposit: true,
				withdrawal: true,
				betAmount: true,
				transactionId: true,
				createdAt: true,
				user: {
					select: {
						id: true,
						email: true,
						name: true,
						username: true,
					},
				},
			},
		});

		return res.status(200).json({
			message: "Retrieved all transactions with user details successfully",
			transactions: transactionsWithUsers,
			success: true,
		});
	} catch (err) {
		console.error("Error retrieving transactions with user details:", err);
		return res.status(500).json({
			message: "Error retrieving transactions with user details",
			error: err.message,
			success: false,
		});
	}
};

// Get User Balance
export const getUserBalance = async (req, res) => {
	const userId = req.user.id;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				balance: true,
			},
		});

		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Retrieved user balance successfully",
			balance: user.balance,
			success: true,
		});
	} catch (err) {
		console.error("Error retrieving user balance:", err);
		return res.status(500).json({
			message: "Error retrieving user balance",
			error: err.message,
			success: false,
		});
	}
};

// Update User Balance
export const updateUserBalance = async (req, res) => {
	const { id } = req.params;
	const { balance } = req.body;

	try {
		const updatedUser = await prisma.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				balance: parseInt(balance),
			},
		});

		return res.status(200).json({
			message: "User balance updated successfully",
			user: updatedUser,
			success: true,
		});
	} catch (err) {
		console.error("Error updating user balance:", err);
		return res.status(500).json({
			message: "Error updating user balance",
			error: err.message,
			success: false,
		});
	}
};

export const updateUserBalanceController = async (
	userId,
	newBalance,
	isWinner,
	betPay
) => {
	try {
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				balance: newBalance,
			},
		});

		if (isWinner && betPay > 0) {
			// Update balance if the bet is a winner and has a payout
			const currentBalance = newBalance;
			const updatedBalance = currentBalance + betPay;

			await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					balance: updatedBalance,
				},
			});

			return {
				success: true,
				message: "User balance updated after winning the bet",
			};
		} else {
			return {
				success: true,
				message: "Bet is not a winner or has no payout",
			};
		}
	} catch (error) {
		throw new Error(`Error updating user balance: ${error.message}`);
	}
};

export const getAllUserBalances = async (req, res) => {
	try {
		const usersWithBalances = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				username: true,
				balance: true,
			},
		});

		return res.status(200).json({
			message: "Retrieved all user balances successfully",
			users: usersWithBalances,
			success: true,
		});
	} catch (err) {
		console.error("Error retrieving user balances:", err);
		return res.status(500).json({
			message: "Error retrieving user balances",
			error: err.message,
			success: false,
		});
	}
};

export const withdrawAmount = async (req, res) => {
	const userId = req.user.id;
	const { amount } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				balance: true,
			},
		});

		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}

		if (user.balance < amount) {
			return res.status(400).json({
				message: "Insufficient balance",
				success: false,
			});
		}

		const updatedBalance = user.balance - amount;

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				balance: updatedBalance,
			},
		});

		await updateUserBalance(userId, updatedBalance);

		return res.status(200).json({
			message: "Amount withdrawn successfully",
			success: true,
		});
	} catch (err) {
		console.error("Error withdrawing amount:", err);
		return res.status(500).json({
			message: "Error withdrawing amount",
			error: err.message,
			success: false,
		});
	}
};

export const handleWinningBet = async (userId, betPay) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new Error(`User not found with ID: ${userId}`);
		}

		const currentBalance = user.balance;
		const updatedBalance = currentBalance + betPay; // Calculate updated balance based on bet payout

		await updateUserBalanceController(userId, updatedBalance);

		return {
			success: true,
			message: "User balance updated after winning the bet",
		};
	} catch (error) {
		throw new Error(`Error handling winning bet: ${error.message}`);
	}
};
