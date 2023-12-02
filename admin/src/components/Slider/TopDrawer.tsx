"use client";
import { useState } from "react";
import { Drawer } from "@mui/material";
import { sidebarLinks } from "@/constants/sidebarLinks";
import { usePathname } from "next/navigation";

import Link from "next/link";
const TopDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<div className="md:hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed top-0 left-0 z-50 p-4 bg-gray-800 text-white"
			>
				<Drawer />
			</button>

			{isOpen && (
				<div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-40 flex justify-end">
					<div className="bg-black w-72 h-full overflow-y-auto">
						<ul>
							{sidebarLinks.map((link) => (
								<Link
									href={link.route}
									className="flex space-x-2  items-center text-xl "
									key={link.route}
								>
									<div
										className={`text-white mt-5 flex  items-center text-xl w-full p-2 rounded-md transition-all hover:bg-gradient-to-r hover:from-purple-400 hover:via-violet-400 hover:to-cyan-400 ${
											pathname === link.route ? "text-blue-500" : ""
										}`}
									>
										<p>{link.icon}</p>
										<p className="text-xl font-bold">{link.label}</p>
									</div>
								</Link>
							))}
						</ul>
					</div>
					<button
						onClick={() => setIsOpen(false)}
						className="absolute top-2 right-2 text-gray-600"
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default TopDrawer;
