"use client";
import React from "react";
import Link from "next/link";

import { sidebarLinks } from "@/constants/sidebarLinks";
import { usePathname } from "next/navigation";

const LeftBar = () => {
	const pathname = usePathname();
	return (
		<div className="bg-gradient-to-b  h-screen  border-r border-gray-400 hidden md:block  from-slate-900 via-gray-900 to-zinc-900 opacity-90 w-56">
			<div className="p-4 font-bold text-white space-y-10">
				{sidebarLinks.map((link) => {
					return (
						<Link
							href={link.route}
							className="flex space-x-2  items-center text-xl "
							key={link.route}
						>
							<div
								className={`text-white mt-5 flex space-x-2 items-center text-xl w-full p-2 rounded-md transition-all hover:bg-gradient-to-r hover:from-purple-400 hover:via-violet-400 hover:to-cyan-400 ${
									pathname === link.route ? "text-blue-500" : ""
								}`}
							>
								<p>{link.icon}</p>
								<p className="text-xl font-bold">{link.label}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default LeftBar;
