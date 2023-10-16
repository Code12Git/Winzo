import { prisma } from "../db/conn";
import bcrypt from "bcryptjs";
import { errors } from "@vinejs/vine";
export default RegisterController = async (req, res) => {
	try {
		const isEmailExist = await prisma.user.findUnique({
			where: {
				email: payload.email,
			},
		});
		if (isEmailExist) {
			res.status(404).json({ message: "Email already exists" });
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

		const user = await prisma.user.create({
			data: {
				name: payload.name,
				username: payload.username,
				email: payload.email,
				password: payload.password,
			},
		});
		return res.status(200).json({
			success: true,
			message: "User registered successfully",
			user,
		});
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return res.status(400).json({ errors: error.messages });
		} else {
			console.error(error);
			return res.status(500).json("Internal Server Error");
		}
	}
};
