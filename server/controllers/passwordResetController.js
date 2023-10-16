import { prisma } from "../db/conn";
import generateRandomToken from "../utils/cryptoUtils.js";
import sendPasswordResetEmail from "../services/emailService.js";
export const forgetPassword = async (req, res) => {
	try {
		const email = req.body;

		const resetToken = generateRandomToken(32);
		const resetTokenExpiry = new Date(Date.now() + 3600000);

		await prisma.user.update({
			where: { email },
			data: { resetToken, resetTokenExpiry },
		});
		const resetLink = `https://yourwebsite.com/reset-password?token=${resetToken}`;
		sendPasswordResetEmail(email, resetLink);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token, newPassword } = req.body;

		const user = await prisma.user.findUnique({
			where: { resetToken: token, resetTokenExpiry: { gte: new Date() } },
		});

		if (!user) {
			return res.status(400).json({ message: "Invalid or expired token." });
		}

		// 6. Update the user's password and clear the reset token
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		await prisma.user.update({
			where: { email: user.email },
			data: {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			},
		});

		res.status(200).json({ message: "Password reset successful." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
