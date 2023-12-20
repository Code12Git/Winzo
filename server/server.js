import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import forgotRoute from "./routes/forgot.js";
import SuperadminRoute from "./routes/admin.js";
import sessionRoute from "./routes/session.js";
import betRoute from "./routes/bet.js";
import qrRoute from "./routes/qr.js";
import transactionRoute from "./routes/transaction.js";
import screenshotRoute from "./routes/screenshot.js";
import withdrawRoute from "./routes/withdraw.js";
import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";
import {
	getRemainingTime,
	remainingTime,
} from "./controllers/SessionController.js";
import modalRoute from "./routes/modal.js";

// Loading environment variables from the config file
dotenv.config({ path: "./.env" });

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
	cors: {
		origin: "http://43.205.144.160:3001",
		methods: ["GET", "POST"],
		credentials: true,
	},
});
app.use(
	cors({
		origin: "http://43.205.144.160:3001",
		methods: ["GET", "POST"],
		credentials: true,
	})
);

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", forgotRoute);
app.use("/api/superadmin", SuperadminRoute);
app.use("/api/session", sessionRoute);
app.use("/api/bet", betRoute);
app.use("/api/qr", qrRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/screenshot", screenshotRoute);
app.use("/api/withdraw", withdrawRoute);
app.use("/api/modal", modalRoute);

app.get("/", (req, res) => {
	res.status(200).json("Working!");
});

io.on("connection", (socket) => {
	const sendRemainingTime = () => {
		const remainingTime = getRemainingTime();
		io.emit("remainingTime", { remainingTime });
	};
	const interval = setInterval(sendRemainingTime, 1000);

	socket.on("disconnect", () => {
		clearInterval(interval);
	});
});

server.listen(port, () => {
	console.log(`🚀 Server is up on PORT: ${port}`);
});
