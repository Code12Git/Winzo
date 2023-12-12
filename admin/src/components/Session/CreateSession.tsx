"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { privateRequest } from "@/helpers/axios";
import toast from "react-hot-toast";
import { Session } from "@/types/types";

const CreateSession = () => {
	const [session, setSession] = useState<Session>({
		color: "red",
	});

	const inputChangeHandler = (
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setSession((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await privateRequest.post("/session", session);
			if (res.data.success === true) {
				toast.success("Session created successfully");
			} else {
				toast.error("Failed to create session");
			}
		} catch (err) {
			toast.error("Error creating session");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
			>
				<h2 className="text-2xl mb-4 text-center">Session</h2>
				<div className="mb-4">
					<label htmlFor="colorSelect" className="block mb-2">
						Select Color:
					</label>
					<select
						name="color"
						value={session.color}
						onChange={inputChangeHandler}
						id="colorSelect"
						className="border border-gray-300 rounded px-3 py-2 w-full"
					>
						<option value="red">Red</option>
						<option value="blue">Blue</option>
						<option value="green">Green</option>
					</select>
				</div>

				<button
					type="submit"
					className="p-2 bg-slate-700 rounded-lg text-white transition-transform ease-in-out delay-200 duration-200 hover:scale-110"
				>
					Create Session
				</button>
			</form>
		</div>
	);
};

export default CreateSession;
