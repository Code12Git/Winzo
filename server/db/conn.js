import { PrismaClient } from "@prisma/client";

// Define the Prisma instance
let prisma;

// Check if in production environment
if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient(); // Create a new PrismaClient instance for production
} else {
	// Check if the global Prisma instance exists, create if not
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma; // Use the global PrismaClient instance for development
}

export default prisma;
