import prisma from "../db/conn.js";

// Create Transaction
export const createTransaction = async (req, res) => {
	const { deposit, transactionId, withdrawal, betAmount } = req.body;

	try {
		if (!deposit || !transactionId) {
			return res.status(400).json({
				message: "Please provide all fields (deposit, transactionId).",
				success: false,
			});
		}

		const remainingBalance = deposit - (betAmount || 0);

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
