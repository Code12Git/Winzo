"use client";
import React, { useEffect, useState } from "react";
import { privateRequest } from "@/helpers/axios";
import UserCard from "./UserCard";
import { Toaster } from "react-hot-toast";
import { User } from "@/types/types";

const UserCards = () => {
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsers = async () => {
		try {
			const res = await privateRequest.get("/superadmin");
			setUsers(res.data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	console.log(users);
	return (
		<>
			<Toaster />
			<div className="flex flex-col gap-8">
				{users?.map((user) => (
					<UserCard user={user} key={user.id} fetchUsers={fetchUsers} />
				))}
			</div>
		</>
	);
};

export default UserCards;
