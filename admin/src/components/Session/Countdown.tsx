import React, { useState, useEffect } from "react";
import { publicRequest } from "@/helpers/axios";

interface CountdownProps {
	fetchSession: () => void;
}

interface CountdownState {
	minutes: number;
	seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ fetchSession }) => {
	const [countdown, setCountdown] = useState<CountdownState>({
		minutes: 0,
		seconds: 0,
	});
	const [isRed, setIsRed] = useState<boolean>(false);

	useEffect(() => {
		let countdownInterval: NodeJS.Timeout;

		const fetchRemainingTime = async () => {
			try {
				const response = await publicRequest.get("/session/remaining");
				const data = response.data;
				const formattedTime = data.remainingTime;

				const timeParts = formattedTime.match(/(\d+) minutes (\d+) seconds/);
				if (timeParts && timeParts.length === 3) {
					const minutes = parseInt(timeParts[1]);
					const seconds = parseInt(timeParts[2]);
					setCountdown({ minutes, seconds });
					startCountdown({ minutes, seconds });
				}
			} catch (error) {
				console.error("Error fetching remaining time:", error);
			}
		};

		const startCountdown = ({ minutes, seconds }: CountdownState) => {
			let remainingSeconds = minutes * 60 + seconds;

			countdownInterval = setInterval(() => {
				if (remainingSeconds > 0) {
					remainingSeconds--;

					const mins = Math.floor(remainingSeconds / 60);
					const secs = remainingSeconds % 60;

					setCountdown({ minutes: mins, seconds: secs });

					if (remainingSeconds <= 30 && remainingSeconds > 0) {
						setIsRed(true);
					} else {
						setIsRed(false);
					}
				} else {
					setIsRed(true);
					clearInterval(countdownInterval);
					fetchSession();
					fetchRemainingTime();
				}
			}, 1000);
		};

		fetchRemainingTime();

		return () => {
			clearInterval(countdownInterval);
		};
	}, [fetchSession]);

	return (
		<div className="grid grid-flow-col gap-5 text-center auto-cols-max">
			<div className={`flex flex-col ${isRed ? "text-red-600" : "text-black"}`}>
				<span className="countdown font-mono text-5xl">
					<span style={{ "--value": countdown.minutes } as React.CSSProperties}>
						{String(countdown.minutes).padStart(2, "0")}
					</span>
				</span>
				min
			</div>
			<div className={`flex flex-col ${isRed ? "text-red-600" : "text-black"}`}>
				<span className="countdown font-mono text-5xl">
					<span style={{ "--value": countdown.seconds } as React.CSSProperties}>
						{String(countdown.seconds).padStart(2, "0")}
					</span>
				</span>
				sec
			</div>
		</div>
	);
};

export default Countdown;
