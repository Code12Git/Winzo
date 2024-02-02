import { updateUserBalanceController } from "./transactionController.js";
import { getRemainingTime } from "./SessionController.js";
import { sessionUserBets } from "./SessionController.js";
import prisma from "../db/conn.js"; // Import Prisma instance
// Create Bet Controller
export const createBetController = async (req, res) => {
	try {
		const loggedInUser = req.user;
		const { color, betAmount } = req.body;

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
		if (parsedBetAmount < 10) {
			return res.status(400).json({
				success: false,
				message: "Minimum bet amount is 10",
			});
		}

		const timeThreshold = 32 * 1000;
		const remainingTime = getRemainingTime();

		if (remainingTime <= timeThreshold) {
			return res.status(400).json({
				success: false,
				message:
					"Bet can only be placed when the remaining time is above 30 seconds.",
			});
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
		const latestSession = await prisma.session.findFirst({
			orderBy: { createdAt: "desc" },
		});

		if (latestSession) {
			const sessionIdentifier = `${latestSession.color}`;
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

		// Deduct the bet amount
		const updatedBalance = user.balance - parsedBetAmount;
		await updateUserBalanceController(loggedInUser.id, updatedBalance);

		// Calculate win
		const userWins = latestSession && latestSession.color === color;
		const isWinner = userWins;
		let payout = 0;
		const blueMultiplier = 4.5;
		const otherColorMultiplier = 2;

		if (isWinner) {
			payout =
				parsedBetAmount *
				(color === "blue" ? blueMultiplier : otherColorMultiplier);
			const newBalance = updatedBalance + payout;
			await updateUserBalanceController(loggedInUser.id, newBalance);
		}

		const bet = await prisma.bet.create({
			data: {
				color,
				betAmount: parsedBetAmount,
				payout,
				user: { connect: { id: loggedInUser.id } },
				session: { connect: { id: latestSession.id } },
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


// Get Bet Controller
export const getBetController = async (req, res) => {
	try {
		const loggedInUser = req.user;

		if (!loggedInUser) {
			return res
				.status(401)
				.json({ success: false, message: "User not logged in" });
		}

		// Retrieve the latest session
		const latestSession = await prisma.session.findFirst({
			orderBy: { createdAt: "desc" },
		});
		if (!latestSession) {
			return res
				.status(404)
				.json({ success: false, message: "No session found" });
		}

		// Check if the user has placed a bet for the latest session
		const latestBet = await prisma.bet.findFirst({
			where: {
				userId: loggedInUser.id,
				sessionId: latestSession.id, // Filter by the latest session ID
			},
			orderBy: { createdAt: "desc" },
			select: {
				color: true,
				betAmount: true,
				payout: true,
				isWinner: true,
				createdAt: true,
			},
		});

		if (!latestBet) {
			return res.status(404).json({
				success: false,
				message: "User has not placed a bet for the latest session",
			});
		}

		return res.status(200).json({
			success: true,
			latestBet,
		});
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};


// Get Recent Bets
export const getRecentBetsController = async (req, res) => {
    try {
        const loggedInUser = req.user;

        if (!loggedInUser) {
            return res.status(401).json({ success: false, message: "User not logged in" });
        }

        const timeThreshold = 32 * 1000;
        const remainingTime = getRemainingTime();

        // Fetch the latest bet
        const latestBet = await prisma.bet.findFirst({
            where: {
                userId: loggedInUser.id,
            },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
            },
        });

        // Fetch recent bets excluding the latest bet
        const recentBets = await prisma.bet.findMany({
            where: {
                userId: loggedInUser.id,
                NOT: {
                    id: latestBet?.id || null,
                },
            },
            orderBy: { createdAt: "desc" },
            take: 10,
            select: {
                color: true,
                betAmount: true,
                payout: true,
                isWinner: true,
                createdAt: true,
            },
        });

        if (!recentBets || recentBets.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No recent bets found for the user",
            });
        }

        return res.status(200).json({
            success: true,
            recentBets,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



// Get All Bet Controller
export const getAllBetsController = async (req, res) => {
	try {
		// Fetch all bets from the database
		const allBets = await prisma.bet.findMany({
			orderBy: {
				createdAt: "desc", // Order the bets by creation date, change this as needed
			},
			select: {
				color: true,
				betAmount: true,
				payout: true,
				isWinner: true,
				createdAt: true,
			},
		});

		if (!allBets || allBets.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No bets found",
			});
		}

		return res.status(200).json({
			success: true,
			allBets,
		});
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};
