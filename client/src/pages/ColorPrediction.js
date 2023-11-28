import React, { useState } from "react";
import Balance from "../components/Balance";
import Timer from "../components/Timer";
import Details from "../components/Details";
import ColorBet from "../components/ColorBet";

const ColorPrediction = () => {
	const backgroundStyle = {
		backgroundImage: `url("/assets/games/game.avif")`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		height: "100vh",
	};
	const [countdownEnded, setCountdownEnded] = useState(false);

	const handleCountdownEnd = () => {
		setCountdownEnded(true);
	};

	return (
		<div
			className="w-full h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20"
			style={backgroundStyle}
		>
			<Balance />
			<Timer onCountdownEnd={handleCountdownEnd} />
			<ColorBet />
			<Details />
		</div>
	);
};

export default ColorPrediction;
