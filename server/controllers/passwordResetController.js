import { prisma } from "../db/conn.js";
import generateRandomToken from "../helper/generateRandomToken.js";
import { sendPasswordResetEmail } from "../services/EmailService.js";
import bcrypt from "bcryptjs"; // Import the bcrypt library

//Forgot Password
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
		console.log(link);
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

//Reset Password

export const resetPassword = async (req, res) => {
	try {
		const { id, token } = req.params;
		const { newPassword, confirmPassword } = req.body;

		const user = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (
			!user ||
			user.resetToken !== token ||
			user.resetTokenExpiry < new Date()
		) {
			return res.status(400).json({
				success: false,
				message:
					"Invalid or expired reset token. Please request a new password reset link.",
			});
		}

		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Passwords do not match. Please make sure they match.",
			});
		}

		// Hash the new password using bcrypt
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		const updatedUser = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			},
		});

		return res.status(200).json({
			success: true,
			message:
				"Password reset successful. You can now log in with your new password.",
			user: updatedUser,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};
