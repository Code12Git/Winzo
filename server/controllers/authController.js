import prisma from "../db/conn.js";
import bcrypt from "bcryptjs";
import { errors } from "@vinejs/vine";
import { registerSchema } from "../validation/authSchema.js";
import { loginSchema } from "../validation/authSchema.js";
import vine from "@vinejs/vine";
import jwt from "jsonwebtoken";
import { CustomErrorReporter } from "../validation/CustomErrorReporter.js";

//Register Controller

export const RegisterController = async (req, res) => {
	try {
		vine.errorReporter = () => new CustomErrorReporter();

		const validator = vine.compile(registerSchema);
		const payload = await validator.validate(req.body);

		const existingUser = await prisma.user.findUnique({
			where: {
				phone: payload.phone,
			},
		});

		if (existingUser) {
			return res.status(409).json({ message: "Phone number already exists" });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

		const user = await prisma.user.create({
			data: {
				name: payload.name,
				phone: payload.phone,
				countryCode: req.body.countryCode,
				password: hashedPassword,
				balance: 300,
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
			return res
				.status(500)
				.json({ success: false, message: "Internal Server Error" });
		}
	}
};

//Login Controller
export const loginController = async (req, res) => {
	try {
		vine.errorReporter = () => new CustomErrorReporter();
		const validator = vine.compile(loginSchema);
		const payload = await validator.validate(req.body);

		const isPhoneExist = await prisma.user.findUnique({
			where: {
				phone: payload.phone,
			},
		});

		if (!isPhoneExist) {
			return res.status(400).json({
				success: false,
				message: "Phone number does not exist",
			});
		}

		const isPasswordValid = bcrypt.compareSync(
			payload.password,
			isPhoneExist.password
		);

		if (!isPasswordValid) {
			return res.status(400).json({
				message: "Invalid Credentials",
				success: false,
			});
		}

		const token = jwt.sign(
			{
				id: isPhoneExist.id,
				Admin: isPhoneExist.Admin,
				SuperAdmin: isPhoneExist.SuperAdmin,
			},
			process.env.SECRET_KEY,
			{ expiresIn: "1d" }
		);

		return res.status(200).json({
			message: "User logged in successfully",
			user: isPhoneExist,
			token,
			success: true,
		});
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return res.status(400).json({ errors: error.messages });
		} else {
			console.error(error);
			return res
				.status(500)
				.json({ success: false, message: "Internal Server Error" });
		}
	}
};

// Change Password
export const updatePasswordByPhoneNumber = async (req, res) => {
	try {
		const { phoneNumber, newPassword } = req.body;

		const user = await prisma.user.findUnique({
			where: {
				phone: phoneNumber,
			},
		});

		if (!user) {
			return res
				.status(404)
				.json({ message: "User with this phone number does not exist" });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				password: hashedPassword,
			},
		});

		return res
			.status(200)
			.json({ message: "Password updated successfully for the user" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
