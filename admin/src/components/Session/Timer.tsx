"use client";
import Countdown from "./Countdown";

const Timer = () => {
	return (
		<div className=" flex flex-col items-center justify-center md:flex-row">
			{/* Countdown */}
			<div className="text-center">
				<h1 className="text-4xl font-bold mt-2 text-yellow-800">Count Down</h1>
				<Countdown />
			</div>
		</div>
	);
};

export default Timer;
