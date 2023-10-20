import React from "react";
import Image from "next/image";
import { TopDeals } from "@/constants/TopDeals";

const TopDealInfo = () => {
	return (
		<>
			{TopDeals.map((deal) => (
				<div key={deal.id} className="flex items-center justify-between">
					<div className="flex gap-2 items-center">
						<div className="avatar">
							<div className="w-10 h-10 rounded-full">
								<Image
									src={deal.img}
									width={100}
									height={100}
									alt={`${deal.name}'s profile picture`}
								/>
							</div>
						</div>
						<div>
							<p className="text-lg">{deal.name}</p>
							<p className="text-sm">{deal.email}</p>
						</div>
					</div>
					<div>
						<p className="text-lg">${deal.transaction}</p>
					</div>
				</div>
			))}
		</>
	);
};

export default TopDealInfo;
