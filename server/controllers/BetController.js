import prisma from "../db/conn.js";
import { updateUserBalanceController } from "./transactionController.js";

export const createBetController = async (req, res) => {
	try {
		const { number, color, betAmount } = req.body;
		const loggedInUser = req.user;

		const parsedBetAmount = Number(betAmount);

		if (!loggedInUser) {
			return res
				.status(401)
				.json({ success: false, message: "User not logged in" });
		}

		if (isNaN(parsedBetAmount)) {
			return res.status(400).json({
				success: false,
				message: "Invalid bet amount, please provide a valid number",
			});
		}

		const user = await prisma.user.findUnique({
			where: {
				id: loggedInUser.id,
			},
			select: {
				balance: true,
			},
		});

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		if (user.balance < parsedBetAmount) {
			return res.status(400).json({
				success: false,
				message: "Insufficient balance for this action",
			});
		}

		// Deduct the bet amount
		const updatedBalance = user.balance - parsedBetAmount;
		await updateUserBalanceController(loggedInUser.id, updatedBalance);

		const latestSession = await prisma.session.findFirst({
			orderBy: { createdAt: "desc" },
		});

		const userWins =
			latestSession &&
			latestSession.number === number &&
			latestSession.color === color;

		const isWinner = userWins;

		let payout = 0;

		if (isWinner) {
			payout = parsedBetAmount * 4;
		}

		// Adjust balance if user wins
		if (isWinner) {
			const newBalance = updatedBalance + payout; // Add the payout
			await updateUserBalanceController(loggedInUser.id, newBalance);
		}
		console.log(isWinner);

		const bet = await prisma.bet.create({
			data: {
				number,
				color,
				betAmount: parsedBetAmount,
				payout,
				userId: loggedInUser.id,
				isWinner,
			},
		});
		console.log("Bet created:", bet);

		return res.status(200).json({
			success: true,
			message: isWinner
				? "Congratulations! You won!"
				: "You did not win this time.",
			bet: bet || null,
		});
	} catch (err) {
		return res.status(500).json({ success: false, err: err.message });
	}
};
