import { prisma } from "../db/conn.js";

//Give Permission
export const permission = async (req, res) => {
	try {
		const userId = req.params.id;
		const updatedUser = await prisma.user.update({
			where: { id: Number(userId) },
			data: { Role: req.body.Role },
		});

		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

//Get Details

export const getUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await prisma.user.findUnique({
			where: { id: Number(userId) },
		});
		if (!user) {
			res.status(404).json({ error: "User not found" });
		} else {
			res.status(200).json(user);
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
//Get All Details
export const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
