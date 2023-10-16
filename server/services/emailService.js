import nodemailer from "nodemailer";

async function sendPasswordResetEmail(email, resetLink) {
	try {
		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "your-email-service-provider",
			auth: {
				user: "your-email@example.com",
				pass: "your-email-password",
			},
		});

		// Define email data
		const mailOptions = {
			from: "your-email@example.com",
			to: email,
			subject: "Password Reset",
			html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
		};

		// Send the email
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Email sending error:", error);
		// Implement error handling, e.g., log the error or retry sending the email
	}
}

// Usage
const resetLink =
	"https://yourwebsite.com/reset-password?token=your-reset-token";
sendPasswordResetEmail("user@example.com", resetLink);
export default sendPasswordResetEmail;
