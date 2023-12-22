import prisma from "../db/conn.js";

export const updateUserModalState = async (req, res) => {
	try {
		const { isOpen } = req.body;
		const userId = req.user.id; // Accessing userId from req.user

		const userExists = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!userExists) {
			return res
				.status(404)
				.json({ success: false, message: "User not found." });
		}

		const updatedModalState = await prisma.userModalState.upsert({
			where: { userId },
			update: { isOpen: Boolean(isOpen) },
			create: { userId, isOpen: Boolean(isOpen) },
		});

		res.status(200).json({ success: true, data: updatedModalState });
	} catch (error) {
		res.status(500).json({ error: error.message, success: false });
	}
};

export const getUserModalState = async (req, res) => {
	try {
		const userId = req.user.id;

		const userModalState = await prisma.userModalState.findUnique({
			where: { userId }, // Use the appropriate unique identifier here (userId)
		});

		if (!userModalState) {
			return res.status(404).json({
				success: false,
				message: "Modal state not found for the user.",
			});
		}

		res.status(200).json({ success: true, data: userModalState });
	} catch (error) {
		res.status(500).json({ error: error.message, success: false });
	}
};
