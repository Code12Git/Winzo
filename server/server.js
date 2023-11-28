import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import forgotRoute from "./routes/forgot.js";
import SuperadminRoute from "./routes/admin.js";
import sessionRoute from "./routes/session.js";
import betRoute from "./routes/bet.js";
import qrRoute from "./routes/qr.js";
// Loading environment variables from the config file
dotenv.config({ path: "./.env" });

// Creating an instance of the Express app
const app = express();

// Defining the port for the server to listen on
const port = process.env.PORT || 3000;

// Applying middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api", forgotRoute);
app.use("/api/superadmin", SuperadminRoute);
app.use("/api/session", sessionRoute);
app.use("/api/bet", betRoute);
app.use("/api/qr", qrRoute);

// Testing route to check if the server is working
app.get("/", (req, res) => {
	res.status(200).json("Working!");
});

// Starting the server and listen on the specified port
app.listen(port, () => {
	console.log(`🚀 Server is up on PORT: ${port}`);
});
