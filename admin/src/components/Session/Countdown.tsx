import React, { useState, useEffect } from "react";

const Countdown = () => {
	const initialCountdown = { minutes: 10, seconds: 0 };
	const [countdown, setCountdown] = useState(initialCountdown);
	const [isRed, setIsRed] = useState(false);

	useEffect(() => {
		const countdownInterval = setInterval(() => {
			const updatedCountdown = { ...countdown };

			if (updatedCountdown.seconds > 0) {
				updatedCountdown.seconds--;
			} else {
				if (updatedCountdown.minutes > 0) {
					updatedCountdown.minutes--;
					updatedCountdown.seconds = 59;
				} else {
					clearInterval(countdownInterval); // Stop the countdown after 10 minutes
					setIsRed(false); // Reset color
					setCountdown(initialCountdown); // Restart countdown
					return;
				}
			}

			// Change text color when reaching a specific time
			if (updatedCountdown.minutes === 0 && updatedCountdown.seconds <= 20) {
				setIsRed(true);
			} else {
				setIsRed(false);
			}

			setCountdown(updatedCountdown);
		}, 1000);

		return () => clearInterval(countdownInterval);
	}, [countdown, initialCountdown]);

	return (
		<div className="grid grid-flow-col gap-5 text-center ">
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
						{countdown.seconds < 10
							? `0${countdown.seconds}`
							: countdown.seconds}
					</span>
				</span>
				sec
			</div>
		</div>
	);
};

export default Countdown;
