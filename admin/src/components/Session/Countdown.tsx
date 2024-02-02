import React, { useState, useEffect } from "react";

interface CountdownProps {
	fetchSession: () => void;
}

interface CountdownState {
	minutes: number;
	seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ fetchSession }) => {
	const [countdown, setCountdown] = useState<CountdownState>({
		minutes: 3,
		seconds: 0,
	});
	const [isRed, setIsRed] = useState<boolean>(false);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		const startCountdown = () => {
			interval = setInterval(() => {
				setCountdown((prevCountdown) => {
					if (prevCountdown.seconds === 0 && prevCountdown.minutes === 0) {
						clearInterval(interval);
						setIsRed(true);
						return { minutes: 3, seconds: 0 };
					}

					const newSeconds =
						prevCountdown.seconds === 0 ? 59 : prevCountdown.seconds - 1;
					const newMinutes =
						prevCountdown.seconds === 0
							? prevCountdown.minutes - 1
							: prevCountdown.minutes;

					if (newMinutes === 0 && newSeconds <= 30) {
						setIsRed(true);
					} else {
						setIsRed(false);
					}

					return { minutes: newMinutes, seconds: newSeconds };
				});
			}, 1000);
		};

		startCountdown();

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const fetchAndReset = () => {
			fetchSession();
			setCountdown({ minutes: 3, seconds: 0 });
		};

		const timeout = setTimeout(fetchAndReset, 60000);

		return () => clearTimeout(timeout);
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
