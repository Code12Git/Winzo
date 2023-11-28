"use client";
import { useState, ChangeEvent, MouseEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Session } from "@/types/types";
import { privateRequest } from "@/helpers/axios";
import toast from "react-hot-toast";

interface Props {
	id: number;
	fetchData: () => void;
}

export default function UpdateSession({ id, fetchData }: Props) {
	let [isOpen, setIsOpen] = useState(false);

	const [session, setSession] = useState<Session>({
		color: "red",
		number: 1,
		price: 0,
	});
	const [filteredNumbers, setFilteredNumbers] = useState<number[]>([]);

	const data: { color: string; number: number }[] = [
		{ color: "red", number: 1 },
		{ color: "red", number: 3 },
		{ color: "red", number: 5 },
		{ color: "blue", number: 2 },
		{ color: "blue", number: 4 },
		{ color: "blue", number: 6 },
		{ color: "green", number: 7 },
		{ color: "green", number: 9 },
		{ color: "green", number: 8 },
	];

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		const { name, value } = e.target;
		const parsedValue = name === "color" ? value : parseInt(value);
		setSession((prev) => ({ ...prev, [name]: parsedValue }));

		if (name === "color") {
			const selectedColor = value;
			const numbersForColor = data
				.filter((item) => item.color === selectedColor)
				.map((item) => item.number);
			setFilteredNumbers(numbersForColor);
		}
	};

	const SubmitHandler = async (
		e: MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			const res = await privateRequest.put(`/session/${id}`, session);
			console.log(res);
			if (res.status === 200) {
				toast.success("Session updated successfully");
				closeModal();
				fetchData();
			} else {
				throw new Error(`Error updating session: ${res.statusText}`);
			}
		} catch (err: any) {
			toast.error(err.message || "Error updating session");
		}
	};

	return (
		<>
			<div>
				<button
					type="button"
					onClick={openModal}
					className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
				>
					Update
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 flex justify-center items-center h-76 z-10"
					onClose={closeModal}
				>
					{/* ... */}
					<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
							Update Session
						</Dialog.Title>
						<div className="mt-2 flex flex-col gap-2">
							<label>Color</label>
							<select
								name="color"
								value={session.color}
								onChange={handleChange}
								className="w-36"
							>
								<option value="red">Red</option>
								<option value="blue">Blue</option>
								<option value="green">Green</option>
							</select>
						</div>
						<div className="mt-2 flex flex-col gap-2">
							<label>Number</label>
							<select
								name="number"
								value={session.number}
								onChange={handleChange}
								className="w-36"
							>
								{filteredNumbers.map((number) => (
									<option key={number} value={number}>
										{number}
									</option>
								))}
							</select>
						</div>
						<div className="mt-2 flex flex-col gap-2">
							<label>Price</label>
							<input
								name="price"
								value={session.price}
								onChange={handleChange}
								type="number"
								placeholder="Price"
								className="w-52 border border-red-400 p-2 rounded"
							/>
						</div>

						<div className="mt-4">
							<button
								type="button"
								onClick={SubmitHandler}
								className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
							>
								Update Session
							</button>
						</div>
					</Dialog.Panel>
				</Dialog>
			</Transition>
		</>
	);
}
