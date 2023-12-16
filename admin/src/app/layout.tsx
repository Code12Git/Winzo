import "./globals.css";
import LeftBar from "@/components/base/Leftbar";
import Header from "@/components/base/Header";
import { Toaster } from "react-hot-toast";
import { Metadata } from "@/types/types";
export const metadata: Metadata = {
	title: "ColorBet",
	description: "Admin Panel",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body style={{ scrollBehavior: "smooth" }}>
				<Toaster />
				<Header />
				<div className="flex h-screen overflow-hidden">
					<LeftBar />
					<div className="flex-1 overflow-y-auto">{children}</div>
				</div>
			</body>
		</html>
	);
}
