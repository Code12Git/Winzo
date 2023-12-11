import prisma from "../db/conn.js";

// Withdraw Money
export const withdraw = async (req, res) => {
	const userId = req.user.id;
	const countryCode = req.user.countryCode;
	const phone = req.user.phone;
	console.log(req.user.countryCode);
	console.log(req.user.phone);

	const amountToWithdraw = req.body.amountToWithdraw;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		const balance = user.balance;

		if (amountToWithdraw < 2000 || amountToWithdraw > 40000) {
			throw new Error("Withdrawal amount must be between 2000 and 40000");
		}

		if (balance < amountToWithdraw || balance - amountToWithdraw < 500) {
			return res.status(400).json({
				message: "Please deposit 500 rupees before withdrawing 2000 rupees",
			});
		}

		if (balance < 2000) {
			return res.status(400).json({
				message:
					"Withdrawal not allowed. Minimum balance of 2000 rupees required.",
			});
		}

		const withdrawalTransaction = await prisma.withdrawal.create({
			data: {
				amountToWithdraw: amountToWithdraw,
				user: {
					connect: {
						id: userId,
					},
				},
				userId: userId,
				phoneNumber: countryCode + phone,
			},
		});

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				balance: user.balance - amountToWithdraw,
			},
		});

		return res
			.status(200)
			.json({ message: "Withdrawal successful", withdrawalTransaction });
	} catch (error) {
		return res
			.status(400)
			.json({ error: `Withdrawal failed: ${error.message}` });
	}
};

// Add Money
export const addBankAccount = async (req, res) => {
	const userId = req.user.id;
	console.log(userId);
	const {
		accountNumber,
		IFSCCode,
		accountMemberName,
		phone,
		countryCode,
		name,
	} = req.body;

	try {
		const existingBankAccount = await prisma.bankAccount.findFirst({
			where: {
				userId: userId,
			},
		});

		if (existingBankAccount) {
			throw new Error("Bank account already exists for the user");
		}

		const newBankAccount = await prisma.bankAccount.create({
			data: {
				accountNumber,
				IFSCCode,
				accountMemberName,
				user: {
					connect: {
						id: userId,
					},
				},
			},
			include: {
				user: true, // Include user details in the response
			},
		});

		// Check if the user exists, and if not, create a new user with the provided details
		if (!newBankAccount.user) {
			const newUser = await prisma.user.create({
				data: {
					id: userId,
					phone,
					countryCode,
					name,
					bankAccount: {
						connect: {
							id: newBankAccount.id,
						},
					},
				},
			});

			// Update the created bank account with the newly created user
			newBankAccount.user = newUser;
		}

		console.log(newBankAccount);
		return res.status(201).json(newBankAccount);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

// Get All Bank Account Details
export const getAccountDetailsForAdmin = async (req, res) => {
	try {
		// Fetch all bank accounts along with their associated user details
		const allAccounts = await prisma.bankAccount.findMany({
			include: {
				user: true,
			},
		});

		return res.status(200).json(allAccounts);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
