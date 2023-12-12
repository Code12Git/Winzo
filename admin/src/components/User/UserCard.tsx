"use client";
import Image from "next/image";
import RoleModal from "./ChangeRoleModal";
import toast from "react-hot-toast";
import { privateRequest } from "@/helpers/axios";
import { User } from "@/types/types";
import UserModal from "../common/UserModal";

interface UserCardProps {
	user: User;
	fetchUsers: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, fetchUsers }) => {
	const deleteHandler = async (id: number) => {
		try {
			const res = await privateRequest.delete(`/superadmin/${id}`);
			const success = res.data.success;
			console.log(res.data.success);
			if (success === true) {
				toast.success(res.data.message);
				fetchUsers();
			} else {
				toast.error(res.data.message);
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete user");
		}
	};

	return (
		<div className="bg-gray-200 rounded-lg p-4 mb-4 md:mb-0 md:flex md:items-center md:justify-between md:px-6">
			<div className="md:flex md:items-center">
				<div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mb-4 md:mb-0">
					{user.id}
				</div>
				<div className="md:ml-4">
					<p className="text-sm text-purple-600">
						{user.countryCode}
						{user.phone}
					</p>
					<p className="text-sm text-purple-600">{user.Role}</p>
				</div>
			</div>
			<div className="flex mt-4 md:mt-0">
				<UserModal user={user} />
				<RoleModal fetchUsers={fetchUsers} user={user} />
				<button
					className="bg-red-500 text-white font-sans p-2 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out text-sm"
					onClick={() => deleteHandler(user.id)}
				>
					<span>Delete User</span>
				</button>
			</div>
		</div>
	);
};

export default UserCard;
