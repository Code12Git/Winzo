"use client";
import React, { useState } from "react";
import { User } from "@/types/types";

interface UserProps {
	user: User;
}

const UserModal: React.FC<UserProps> = ({ user }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				className="bg-gradient-to-r from-cyan-400 to-purple-500 px-2 py-2 text-white rounded-md transition-all hover:scale-105 ease-in-out delay-150 duration-150 hover:from-pink-500 hover:to-yellow-500 "
				type="button"
				onClick={() => setShowModal(true)}
			>
				Details
			</button>
			{showModal ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute w-full h-full bg-black opacity-25"></div>
					<div className="relative z-50 bg-white rounded-lg shadow-lg p-6">
						<h1 className="text-3xl font-semibold text-gray-900 mb-4">
							User Details
						</h1>
						<div className="mb-4">
							<p className="text-xl text-gray-900 mb-2">ID: {user.id}</p>
							<p className="text-xl text-gray-900 mb-2">Name: {user.name}</p>
							<p className="text-xl text-red-600 mb-2">Email: {user.email}</p>
							<p className="text-xl text-blue-600 mb-2">
								Phone: {user.countryCode}
								{user.phone}
							</p>
							<p className="text-xl text-purple-600 mb-2">
								Username: {user.username}
							</p>
							<p className="text-xl text-pink-600 mb-2">Role: {user.Role}</p>
						</div>
						<button
							className="bg-pink-500 text-white font-bold uppercase px-4 py-2 text-sm rounded hover:bg-pink-600 focus:outline-none shadow hover:shadow-md transition-all duration-300"
							type="button"
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			) : null}
		</>
	);
};

export default UserModal;
