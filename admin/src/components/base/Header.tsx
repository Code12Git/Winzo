"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoutModal from "../common/LogoutModal";
import TopDrawer from "../Slider/TopDrawer";

const Header = () => {
	const isLocalStorageAvailable =
		typeof window !== "undefined" && window.localStorage;

	const adminJSON = isLocalStorageAvailable
		? localStorage.getItem("user")
		: null;
	const token = isLocalStorageAvailable ? localStorage.getItem("token") : null;
	const isLoggedIn = adminJSON && token;

	return (
		<div className="navbar z-10 bg-gray-900">
			<div className="flex-1">
				<TopDrawer />
				<a className="btn btn-ghost normal-case text-xl text-white">
					BetMaster
				</a>
			</div>
			<div className="flex gap-4 text-white">
				{isLoggedIn ? (
					<div className="flex space-x-4 items-center">
						<button className="hover-bg-white rounded-xl">
							<LogoutModal />
						</button>
					</div>
				) : (
					<Link href="/login">
						<button className="bg-gradient-to-r flex items-center from-indigo-500 from-10% text-white font-sans via-sky-500 via-30% to-emerald-500 to-90% p-2 rounded-lg hover:from-emerald-500 hover:via-sky-500 hover:to-indigo-500 hover:scale-110 transition-transform delay-200 ease-in-out">
							Login
						</button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
