import Features from "../components/Features";
import Games from "../components/Games";
import Carousel from "../components/common/Carousel";

const Dashboard = () => {
	return (
		<div className="bg-gradient-to-b from-black via-slate-950 to-gray-950">
			<Carousel />
		<Features />
			<Games />
		</div>
	);
};

export default Dashboard;
