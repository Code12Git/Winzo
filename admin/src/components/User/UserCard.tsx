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
		<div className="flex bg-gradient-to-r from-purple-200 via-violet-200 to-purple-400 p-4 rounded-lg w-full">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center space-x-4">
					<div className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
						{user.id}
					</div>
					<div className="avatar">
						<div className="w-12 rounded-full">
							<Image
								src="/assets/avatar/avatar.jpg"
								alt="assets"
								width={100}
								height={100}
							/>
						</div>
					</div>
					<p className="text-purple-800 text-xl">{user.email}</p>
					<p className="text-purple-800 text-xl">{user.username}</p>
					<p className="text-purple-800 text-xl">
						{user.countryCode}
						{user.phone}
					</p>
					<p className="text-purple-800 text-xl">{user.Role}</p>
				</div>
				<div className="flex space-x-4 items-center">
					<UserModal user={user} />
					<RoleModal fetchUsers={fetchUsers} user={user} />
					<button
						className="bg-gradient-to-r from-pink-500 text-white font-sans via-red-500 to-blue-500 to-90% p-2 rounded-lg hover:from-blue-500 hover:via-sky-500 hover:to-red-500 hover:scale-110 transition-transform delay-200 ease-in-out"
						onClick={() => deleteHandler(user.id)}
					>
						<span className="text-white font-sans relative z-10">
							Delete User
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
