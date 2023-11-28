import prisma from "../db/conn.js";

// Create Bet Controller

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

		const latestSession = await prisma.session.findFirst({
			orderBy: { createdAt: "desc" },
		});

		const userWins =
			latestSession &&
			latestSession.number === number &&
			latestSession.color === color;

		let payout = 0;
		let isWinner = false;

		if (number && color && userWins) {
			payout = 4 * parsedBetAmount;
			isWinner = true;
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
			message: userWins
				? "Congratulations! You won!"
				: "You did not win this time.",
			bet,
		});
	} catch (err) {
		return res.status(500).json({ success: false, err: err.message });
	}
};
