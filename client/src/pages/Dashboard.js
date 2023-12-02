import Carousel from "../components/common/Carousel";
import Balance from "../components/Balance";
import Timer from "../components/Timer";
import ColorBet from "../components/ColorBet";
import React from "react";

const Dashboard = () => {
	const backgroundStyle = {
		backgroundImage: `url("/assets/games/game.avif")`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		height: "100vh",
	};

	return (
		<div className="bg-gradient-to-b from-black via-slate-950 to-gray-950">
			<Carousel />
			<div
				className="w-full h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20"
				style={backgroundStyle}
			>
				<Balance />
				<ColorBet />
				<Timer />
			</div>
		</div>
	);
};

export default Dashboard;
