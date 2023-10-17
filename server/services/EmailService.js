import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export async function sendPasswordResetEmail(email, resetLink) {
	// Create a transporter using your email credentials
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	// Create the email message
	let message = {
		from: process.env.EMAIL,
		to: email,
		subject: "Reset Password",
		html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
	};

	try {
		await transporter.sendMail(message);
		console.log("Email sent successfully.");
	} catch (error) {
		console.error("Email sending error:", error);
	}
}
