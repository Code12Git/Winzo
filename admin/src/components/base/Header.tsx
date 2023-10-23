"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutModal from "../common/LogoutModal";

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
				<a className="btn btn-ghost normal-case text-xl text-white">
					BetMaster
				</a>
			</div>
			<div className="flex gap-4 text-white">
				{/* Dropdown 1 */}
				<div className="navbar-end flex">
					<button className="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<button className="btn btn-ghost btn-circle">
						<div className="indicator">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v 3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
							<span className="badge badge-xs badge-primary indicator-item"></span>
						</div>
					</button>
				</div>

				{isLoggedIn ? (
					<div className="flex space-x-4 items-center">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<Image
									src="/assets/avatar/avatar.jpg"
									width={100}
									height={100}
									alt="User Avatar"
								/>
							</div>
						</label>
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
