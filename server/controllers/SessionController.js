import prisma from "../db/conn.js";
import cron from "node-cron";
// Creating a session

const specificSessions = [
	{ color: "red", number: 1 },
	{ color: "red", number: 3 },
	{ color: "red", number: 5 },
	{ color: "blue", number: 2 },
	{ color: "blue", number: 4 },
	{ color: "blue", number: 6 },
	{ color: "green", number: 7 },
	{ color: "green", number: 9 },
	{ color: "green", number: 8 },
];

let adminCreatedSession = false;
let lastIntervalExecution = Date.now();
const createRandomSession = async () => {
	const randomIndex = Math.floor(Math.random() * specificSessions.length);
	const { color, number } = specificSessions[randomIndex];

	try {
		const session = await prisma.session.create({
			data: {
				color,
				number,
			},
		});

		console.log("Random Session Created:", session);
	} catch (err) {
		console.error("Error creating random session:", err);
	}
};

const getRemainingTime = () => {
	const currentTime = Date.now();
	const timeSinceLastExecution = currentTime - lastIntervalExecution;
	const remainingTime = 60000 - timeSinceLastExecution; // Calculate remaining time until next execution
	return remainingTime;
};

const formatCountdown = (milliseconds) => {
	const seconds = Math.floor((milliseconds / 1000) % 60);
	const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);

	return `${minutes} minutes ${seconds} seconds`;
};

export const remainingTime = (req, res) => {
	const remainingTime = getRemainingTime();
	const formattedTime = formatCountdown(remainingTime);
	res.status(200).json({ remainingTime: formattedTime });
};

const checkAndCreateRandomSession = () => {
	// Update last execution time
	const currentTime = Date.now();
	lastIntervalExecution = currentTime;
	if (!adminCreatedSession) {
		console.log("Session not created by admin. Creating a random session...");
		createRandomSession();
	} else {
		console.log(
			"Session already created by admin. Skipping random session creation."
		);
	}
	adminCreatedSession = false;
};
checkAndCreateRandomSession();

setInterval(checkAndCreateRandomSession, 60000);

export const createSession = async (req, res) => {
	const { color, number } = req.body;
	try {
		if (!color || !number) {
			return res.status(400).json({
				success: false,
				message: "Please provide both color and number for the session.",
			});
		}

		const session = await prisma.session.create({
			data: {
				color,
				number,
			},
		});

		res.status(200).json({
			success: true,
			message: "Session created successfully!",
			session,
		});

		adminCreatedSession = true;
	} catch (err) {
		res.status(500).json({ error: err.message, success: false });
	}
};

// Updating a session
export const updateSession = async (req, res) => {
	const { id } = req.params;
	const { price, color, number } = req.body;

	try {
		const sessionDataToUpdate = {};

		if (price !== undefined) {
			sessionDataToUpdate.price = price;
		}

		if (color !== undefined) {
			sessionDataToUpdate.color = color;
		}

		if (number !== undefined) {
			sessionDataToUpdate.number = number;
		}

		const updatedSession = await prisma.session.update({
			where: { id: Number(id) },
			data: sessionDataToUpdate,
		});

		res.status(200).json({ session: updatedSession, success: true });
	} catch (err) {
		res.status(500).json({ error: err.message, success: false });
	}
};

// Deleting a session
export const deleteSession = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedSession = await prisma.session.delete({
			where: { id: Number(id) },
		});
		if (!deletedSession) {
			res.status(404).json({ message: "User not found" });
		}

		res
			.status(200)
			.json({ session: "User deleted Successfully", success: true });
	} catch (err) {
		res.status(500).json({ error: err.message, success: false });
	}
};

// Getting all session
export const getAllSession = async (req, res) => {
	try {
		const allSessions = await prisma.session.findMany();

		res.status(200).json(allSessions);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getLatestSession = async (req, res) => {
	try {
		const latestSession = await prisma.session.findFirst({
			orderBy: { createdAt: "desc" },
		});

		const latestSessionName = latestSession ? latestSession.id : "";

		res.status(200).json({ latestSessionName });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
