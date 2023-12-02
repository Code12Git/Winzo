"use client";
import React, { useState, useEffect } from "react";

interface CreateSessionProps {
	getSession: () => void;
}

const Countdown: React.FC<CreateSessionProps> = ({ getSession }) => {
	const initialCountdown = {
		minutes: 1,
		seconds: 0,
	};

	const [countdown, setCountdown] = useState(initialCountdown);
	const [countdownEnded, setCountdownEnded] = useState(false);
	const [isRed, setIsRed] = useState(false);

	useEffect(() => {
		let countdownInterval: any;

		const fetchRemainingTime = async () => {
			try {
				const response = await fetch(
					"http://localhost:7000/api/session/remaining"
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				const formattedTime = data.remainingTime;
				console.log(data);

				const [minutes, seconds] = formattedTime.split(":").map(Number);
				setCountdown({ minutes, seconds });

				countdownInterval = setInterval(() => {
					setCountdown((prevCountdown) => {
						const updatedCountdown = { ...prevCountdown };

						if (updatedCountdown.seconds > 0) {
							updatedCountdown.seconds--;
						} else {
							if (updatedCountdown.minutes === 0) {
								setIsRed(false);
								clearInterval(countdownInterval);
								getSession();
								return { minutes: 0, seconds: 0 };
							}
							updatedCountdown.seconds = 59;
							updatedCountdown.minutes--;
						}

						if (
							updatedCountdown.minutes === 0 &&
							updatedCountdown.seconds === 0
						) {
							setIsRed(false);
							clearInterval(countdownInterval);
							getSession();
						} else {
							setIsRed(false);
						}

						return updatedCountdown;
					});
				}, 1000);
			} catch (error) {
				console.error("Error fetching remaining time:", error);
			}
		};

		fetchRemainingTime();

		return () => {
			clearInterval(countdownInterval);
		};
	}, [getSession]);

	return (
		<div className="grid grid-flow-col p-12 gap-5 text-center auto-cols-max">
			<div className={`flex flex-col ${isRed ? "text-red-600" : "text-black"}`}>
				<span className="countdown font-mono text-5xl">
					<span style={{ "--value": countdown.minutes }}>
						{countdown.minutes}
					</span>
				</span>
				min
			</div>
			<div className={`flex flex-col ${isRed ? "text-red-600" : "text-black"}`}>
				<span className="countdown font-mono text-5xl">
					<span style={{ "--value": countdown.seconds }}>
						{countdown.seconds}
					</span>
				</span>
				sec
			</div>
		</div>
	);
};

export default Countdown;
