"use client";
import { privateRequest } from "@/helpers/axios";
import React, { useEffect, useState } from "react";
import { BalanceDetails } from "@/types/types";
import BalanceModal from "../common/BalanceModal";
const Balance = () => {
	const [users, setUsers] = useState<BalanceDetails[]>([]);

	useEffect(() => {
		fetchBalance();
	}, []);
	const fetchBalance = async () => {
		try {
			if (typeof window !== "undefined") {
				const res = await privateRequest.get("/transaction/all");
				setUsers(res.data.users);
			}
		} catch (error) {
			console.error("Error fetching balance:", error);
		}
	};

	return (
		<div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{users.map((user) => (
				<div key={user.id} className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Id:{user.id}</h2>
						<p>Name:{user.name}</p>
						<p>Phone:{user.phone}</p>
						<p>Balance:{user.balance}</p>
						<div className="card-actions justify-end">
							<button>
								<BalanceModal id={user.id} fetchBalance={fetchBalance} />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Balance;
