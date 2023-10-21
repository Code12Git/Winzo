import React from "react";
import TopDealInfo from "./TopDealInfo";

const TopDeals = () => {
	return (
		<div className="text-3xl w-96 border-slate-500 p-5 border text-white font-bold ">
			<div className="flex flex-col gap-5">
				<p>Top Deals</p>
				<div className="flex flex-col gap-6">
					<TopDealInfo />
				</div>
			</div>
		</div>
	);
};

export default TopDeals;
