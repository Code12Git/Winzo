import { prisma } from "../db/conn.js";
import generateRandomToken from "../helper/generateRandomToken.js";
import { sendPasswordResetEmail } from "../services/EmailService.js";
export const forgotpassword = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const resetToken = generateRandomToken(32);

		const updateUser = await prisma.user.update({
			where: {
				email,
			},
			data: {
				resetToken: resetToken,
				resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
			},
		});

		const link = `http://localhost:3000/reset-password?token=${resetToken}&user=${user.id}`;

		sendPasswordResetEmail(updateUser.email, link);
		return res.status(200).json({
			success: true,
			message:
				"Password reset instructions have been sent to your email. Please check your inbox and follow the provided instructions to reset your password.",
			updateUser,
		});
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};
