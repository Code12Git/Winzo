import prisma from "../db/conn.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
// Create a new qr code
export const createQr = async (req, res) => {
	try {
		if (!req.files || !req.files.qrcode || req.files.qrcode.length === 0) {
			return res.status(400).json("QrCode file is required");
		}
		console.log("Req files:", req.files.qrcode);
		const qrcodeLocalPath = req.files.qrcode[0].path;
		console.log("QrCodeLocalPath:", qrcodeLocalPath);
		const uploadedQr = await uploadOnCloudinary(qrcodeLocalPath);
		console.log("UploadedQr", uploadedQr);
		if (!uploadedQr) {
			return res.status(400).json("Error uploading QrCode to Cloudinary");
		}
		console.log("Created");
		console.log(uploadedQr.url);

		const createdQr = await prisma.qr.create({
			data: {
				qrcode: uploadedQr.url,
			},
		});

		if (!createdQr) {
			return res.status(500).json({ error: "Error creating QR code" });
		}

		res.status(201).json(createdQr);
	} catch (err) {
		res
			.status(500)
			.json({ error: "Internal Server Error", message: err.message });
	}
};

// Get the latest QR code
export const getLatestQr = async (req, res) => {
	try {
		const latestQr = await prisma.qr.findFirst({
			orderBy: {
				createdAt: "desc",
			},
		});

		if (!latestQr) {
			return res.status(404).json({ message: "QR code not found" });
		}

		res.status(200).json(latestQr);
	} catch (err) {
		res
			.status(500)
			.json({ error: "Internal Server Error", message: err.message });
	}
};
