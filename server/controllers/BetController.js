import { updateUserBalanceController } from "./transactionController.js";
import { getRemainingTime } from "./SessionController.js";
import { sessionUserBets } from "./SessionController.js";
import prisma from "../db/conn.js"; // Import Prisma instance

export const createBetController = async (req, res) => {
	try {
		const loggedInUser = req.user;
		const { number, color, betAmount } = req.body;

		if (!loggedInUser) {
			return res
				.status(401)
				.json({ success: false, message: "User not logged in" });
		}

		const parsedBetAmount = Number(betAmount);

		if (isNaN(parsedBetAmount)) {
			return res.status(400).json({
				success: false,
				message: "Invalid bet amount, please provide a valid number",
			});
		}

		const timeThreshold = 22 * 1000;
		const remainingTime = getRemainingTime();

		if (remainingTime <= timeThreshold) {
			return res.status(400).json({
				success: false,
				message:
					"Bet can only be placed when the remaining time is above 20 seconds.",
			});
		}

		const latestSession = await prisma.session.findFirst({
			orderBy: { createdAt: "desc" },
		});

		if (latestSession) {
			const sessionIdentifier = `${latestSession.color}_${latestSession.number}`;
			if (sessionUserBets.has(sessionIdentifier)) {
				const userBets = sessionUserBets.get(sessionIdentifier);

				if (userBets.has(loggedInUser.id)) {
					return res.status(400).json({
						success: false,
						message: "You've already placed a bet for this session.",
					});
				} else {
					userBets.add(loggedInUser.id);
				}
			}
		}

		const user = await prisma.user.findUnique({
			where: { id: loggedInUser.id },
			select: { balance: true },
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

		// Calculate win
		const userWins =
			latestSession &&
			latestSession.number === number &&
			latestSession.color === color;
		const isWinner = userWins;
		let payout = 0;

		if (isWinner) {
			payout = parsedBetAmount * 4;
			const newBalance = updatedBalance + payout; // Add the payout
			await updateUserBalanceController(loggedInUser.id, newBalance);
		}

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
