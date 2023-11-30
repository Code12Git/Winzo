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
				balance: remainingBalance,
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

export const getAllTransactions = async (req, res) => {
	try {
		const transactionsWithUsers = await prisma.transaction.findMany({
			select: {
				id: true,
				balance: true,
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
