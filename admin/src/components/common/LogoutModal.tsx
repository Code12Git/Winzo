"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function LogoutModal() {
	const router = useRouter();
	const [showModal, setShowModal] = React.useState(false);

	const logoutHandler = () => {
		try {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			setShowModal(false);
			router.push("/login");
			toast.success("User logged out Successfully");
			window.location.reload();
		} catch (err: any) {
			toast.error("Error while logout ", err.message);
		}
	};

	return (
		<>
			<Toaster />
			<button
				className="bg-gradient-to-r from-pink-500 to-pink-600 text-white active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none hover:scale-105 ease-in-out transition-transform duration-300"
				type="button"
				onClick={() => setShowModal(true)}
			>
				Logout
			</button>
			{showModal ? (
				<>
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<div className="absolute w-full h-full bg-black opacity-25"></div>
						<div className="relative z-50 bg-white rounded-lg shadow-lg">
							<div className="flex flex-col p-4">
								{/* Header */}
								<div className="border-b border-gray-300 pb-4">
									<h3 className="text-2xl text-pink-500 font-semibold">
										Are you sure you want to Logout?
									</h3>
								</div>
								{/* Body - You can add a message here if needed */}
								{/* Footer */}
								<div className="flex justify-end mt-4">
									<button
										className="text-gray-500 font-bold uppercase px-4 py-2 text-sm focus:outline-none hover:text-pink-500 transition-colors duration-300"
										type="button"
										onClick={() => setShowModal(false)}
									>
										No
									</button>
									<button
										className="bg-pink-500 text-white font-bold uppercase px-4 py-2 text-sm ml-4 rounded focus:outline-none hover:bg-pink-600 shadow hover:shadow-md transition-all duration-300"
										type="button"
										onClick={logoutHandler}
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}
