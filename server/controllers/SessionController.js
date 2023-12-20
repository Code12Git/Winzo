import prisma from "../db/conn.js";
// Creating a session

const specificSessions = [
	{ color: "red" },
	{ color: "blue" },
	{ color: "green" },
];

export const sessionUserBets = new Map();

let adminCreatedSession = false;
let lastIntervalExecution = Date.now();
const createRandomSession = async () => {
	const randomIndex = Math.floor(Math.random() * specificSessions.length);
	const { color } = specificSessions[randomIndex];
	const sessionIdentifier = `${color}`;
	sessionUserBets.set(sessionIdentifier, new Set());
	try {
		const currentTime = new Date();
		const session = await prisma.session.create({
			data: {
				color,
				createdAt: currentTime,
				startTime: new Date(currentTime.getTime() + 180000),
			},
		});
		console.log(session);
	} catch (err) {
		console.error("Error creating random session:", err);
	}
};

export const getRemainingTime = () => {
	const currentTime = Date.now();
	const timeSinceLastExecution = currentTime - lastIntervalExecution;
	const remainingTime = 180000 - timeSinceLastExecution;
	return remainingTime > 0 ? remainingTime : 0; // Ensure remaining time is non-negative
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
	const currentTime = Date.now();
	lastIntervalExecution = currentTime;
	if (!adminCreatedSession) {
		createRandomSession();
	} else {
		console.log(
			"Session already created by admin. Skipping random session creation."
		);
	}
	adminCreatedSession = false;
};

checkAndCreateRandomSession();
setInterval(checkAndCreateRandomSession, 180000);

export const createSession = async (req, res) => {
	const { color } = req.body;
	try {
		if (!color) {
			return res.status(400).json({
				success: false,
				message: "Please provide color for the session.",
			});
		}

		const session = await prisma.session.create({
			data: {
				color,
			},
		});

		adminCreatedSession = true;

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
	const { color } = req.body;

	try {
		const sessionDataToUpdate = {};

		if (color !== undefined) {
			sessionDataToUpdate.color = color;
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
export const getAllSessionForUser = async (req, res) => {
	try {
		const remainingTime = getRemainingTime();

		// Fetch all sessions
		const allSessions = await prisma.session.findMany();

		// Check if remaining time is above 30 seconds and there are sessions available
		if (remainingTime > 30000 && allSessions.length > 0) {
			const latestSession = await prisma.session.findFirst({
				orderBy: { createdAt: "desc" },
			});

			// Filter out the latest session if remaining time is above 30 seconds
			const sessionsToShow = allSessions.filter(
				(session) => session.id !== latestSession?.id
			);

			res.status(200).json(sessionsToShow);
		} else {
			res.status(200).json(allSessions); // Return all sessions if remaining time is <= 30 seconds or no sessions available
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get All sessions
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
		const remainingTime = getRemainingTime();

		let latestSessionId = "";

		if (remainingTime <= 30000) {
			const latestSession = await prisma.session.findFirst({
				orderBy: { createdAt: "desc" },
			});
			latestSessionId = latestSession ? latestSession.id : "";
		} else {
			const sessions = await prisma.session.findMany({
				orderBy: { createdAt: "desc" },
				take: 2,
				skip: 1,
			});
			latestSessionId = sessions.length > 0 ? sessions[0].id : "";
		}

		res.status(200).json({ latestSessionId });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteAllSessions = async (req, res) => {
	try {
		// Deleting all sessions
		const deleteResult = await prisma.session.deleteMany();

		res.status(200).json({
			success: true,
			message: `${deleteResult.count} sessions deleted successfully.`,
		});
	} catch (error) {
		res.status(500).json({ error: error.message, success: false });
	}
};
