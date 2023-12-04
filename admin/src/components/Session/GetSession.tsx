"use client";
import { useEffect, useState } from "react";
import { publicRequest, privateRequest } from "@/helpers/axios";
import { Session } from "@/types/types";
import CreateSession from "./CreateSession";
import UpdateSession from "./UpdateSession";
import toast from "react-hot-toast";
import Countdown from "./Countdown";
const GetSession = () => {
	const [sessions, setSessions] = useState<Session[]>([]);

	useEffect(() => {
		fetchAllSession();
	}, []);
	const fetchAllSession = async () => {
		try {
			const sessionData = await publicRequest.get("/session");
			setSessions(sessionData.data);
		} catch (error) {
			console.error("Error fetching session:", error);
		}
	};

	const getColorMarker = (color: string) => {
		switch (color) {
			case "red":
				return "bg-red-500";
			case "blue":
				return "bg-blue-500";
			case "green":
				return "bg-green-500";
			default:
				return "bg-gray-500";
		}
	};

	const deleteHandler = async (id: number) => {
		try {
			await privateRequest.delete(`/session/${id}`);
			toast.success("Session deleted Successfully!");
			fetchAllSession();
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	return (
		<>
			<Countdown
				className="flex items-center m-auto mt-12"
				fetchSession={fetchAllSession}
			/>
			<CreateSession />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-12">
				{sessions.map((session) => (
					<div key={session.id} className="bg-white rounded-lg p-4 shadow-md">
						<div className="flex flex-col">
							<div className="flex items-center mb-2">
								<div
									className={`${getColorMarker(
										session.color
									)} h-4 w-4 rounded-full mr-2`}
								></div>
								<p className="font-semibold">ID: {session.id}</p>
							</div>
							<p>Color: {session.color}</p>
							<p>Number: {session.number}</p>
							<div className="flex justify-between mt-4">
								<button>
									<UpdateSession fetchData={fetchAllSession} id={session.id} />
								</button>
								<button
									onClick={() => deleteHandler(session.id)}
									className="flex items-center bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-md"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default GetSession;
