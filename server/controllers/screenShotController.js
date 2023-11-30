import prisma from "../db/conn.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
// Creating screenshot
export const createScreenshot = async (req, res) => {
	console.log(req.user);
	try {
		if (
			!req.files ||
			!req.files.screenshot ||
			!req.files.screenshot.length === 0
		) {
			return res.status(400).json({
				message: "Please upload a screenshot.",
				success: false,
			});
		}

		const screenshotLocalPath = req.files.screenshot[0].path;
		const uploadedScreenshot = await uploadOnCloudinary(screenshotLocalPath);
		if (!uploadedScreenshot) {
			return res.status(400).json({
				message: "Error uploading Screenshot to Cloudinary",
				success: false,
			});
		}

		const screenshot = await prisma.screenshot.create({
			data: {
				screenshot: uploadedScreenshot.url,
				userId: req.user.id,
			},
		});

		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
			select: {
				id: true,
				email: true,
				name: true,
				username: true,
			},
		});

		return res.status(201).json({
			message: "Screenshot created successfully",
			screenshot: {
				...screenshot,
				user,
			},
			success: true,
		});
	} catch (err) {
		console.error("Error creating screenshot:", err);
		return res.status(500).json({
			message: "Error creating screenshot",
			error: err.message,
			success: false,
		});
	}
};

export const getAllScreenshot = async (req, res) => {
	try {
		const screenshotsWithUsers = await prisma.screenshot.findMany({
			select: {
				id: true,
				screenshot: true,
				createdAt: true,
				userId: true,
				user: {
					select: {
						id: true,
						email: true,
						name: true,
						username: true,
					},
				},
			},
		});

		return res.status(200).json({
			message: "Retrieved all screenshots with user details successfully",
			screenshots: screenshotsWithUsers,
			success: true,
		});
	} catch (err) {
		console.error("Error retrieving user details and screenshots:", err);
		return res.status(500).json({
			message: "Error retrieving user details and screenshots",
			error: err.message,
			success: false,
		});
	}
};
