import React from "react";
import TopDeals from "./TopDeals/TopDeals";
// import TotalUsers from "./TotalUsers/TotalUsers";

const Dashboard = () => {
	return (
		<div className="flex gap-2">
			<TopDeals />
			{/* <TotalUsers /> */}
		</div>
	);
};

export default Dashboard;
