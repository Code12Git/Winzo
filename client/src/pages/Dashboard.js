import Carousel from "../components/common/Carousel";
import Balance from "../components/Balance";
import Timer from "../components/Timer";
import ColorBet from "../components/ColorBet";
import React from "react";

const Dashboard = () => {
	return (
		<div>
			<div className="w-full h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
				<Balance />
				<ColorBet />
				<Timer />
			</div>
		</div>
	);
};

export default Dashboard;
