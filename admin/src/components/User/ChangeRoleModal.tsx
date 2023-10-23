"use client";
import React, { useState } from "react";
import { User } from "@/types/types";
import { privateRequest } from "@/helpers/axios";
import toast from "react-hot-toast";

interface ModalProps {
	user: User;
	fetchUsers: () => void;
}

const RoleModal: React.FC<ModalProps> = ({ user, fetchUsers }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState(user.Role);

	const handleChangeRole = (newValue: string) => {
		setSelectedOption(newValue);
		console.log(newValue);
	};

	const handleSubmit = async () => {
		try {
			const res = await privateRequest.put(`/superadmin/${user.id}`, {
				Role: selectedOption,
			});
			console.log(res.data);

			toast.success("User Permission Successfully Added");
			fetchUsers();
			setShowModal(false);
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	return (
		<>
			<button
				className="bg-gradient-to-r py-2 text-white rounded-md hover:scale-105 transition-all delay-150 ease-in-out px-2 from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
				type="button"
				onClick={() => setShowModal(true)}
			>
				Change Role
			</button>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">
										Which Role do you want to choose?
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black  opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<p className="my-4 text-blueGray-500 text-lg leading-relaxed">
										<div className="form-control">
											<label className="label cursor-pointer">
												<span className="label-text text-lg">Super Admin</span>
												<input
													type="radio"
													name="roleOption"
													value="SuperAdmin"
													onChange={() => handleChangeRole("SuperAdmin")}
													checked={selectedOption === "SuperAdmin"}
													className="radio checked:bg-red-500"
												/>
											</label>
										</div>
										<div className="form-control">
											<label className="label cursor-pointer">
												<span className="label-text text-lg">Admin</span>
												<input
													type="radio"
													name="roleOption"
													value="Admin"
													onChange={() => handleChangeRole("Admin")}
													checked={selectedOption === "Admin"}
													className="radio checked:bg-blue-500"
												/>
											</label>
										</div>
										<div className="form-control">
											<label className="label cursor-pointer">
												<span className="label-text text-lg">User</span>
												<input
													type="radio"
													name="roleOption"
													value="User"
													onChange={() => handleChangeRole("User")}
													checked={selectedOption === "User"}
													className="radio checked:bg-green-500"
												/>
											</label>
										</div>
									</p>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-white active-bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={handleSubmit}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default RoleModal;
