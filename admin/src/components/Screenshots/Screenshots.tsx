"use client";
import React, { useEffect, useState } from "react";
import { privateRequest } from "@/helpers/axios";
import { ScreenshotDetails } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
const Screenshots = () => {
	const [screenshots, setScreenshots] = useState<ScreenshotDetails[] | null>(
		null
	);

	useEffect(() => {
		const fetchScreenshots = async () => {
			try {
				const response = await privateRequest.get("/screenshot");
				if (response.data && response.data.screenshots) {
					setScreenshots(response.data.screenshots);
				}
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching screenshots:", error);
			}
		};

		fetchScreenshots();
	}, []);

	const formatDateTime = (timestamp: string) => {
		const date = new Date(timestamp);
		const formattedDate = date.toLocaleDateString(); // Format the date
		const formattedTime = date.toLocaleTimeString(); // Format the time
		return `${formattedDate} ${formattedTime}`;
	};

	return (
		<div className="p-6">
			<h3 className="text-2xl font-semibold mb-4">Screenshots</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{screenshots?.map((screenshot) => (
					<div
						key={screenshot.id}
						className="bg-white rounded-lg shadow-md p-4"
					>
						<a
							href={screenshot?.screenshot}
							target="_blank"
							className="block cursor-pointer mb-2"
							rel="noopener noreferrer"
						>
							<Image
								src={screenshot?.screenshot}
								alt={`Screenshot ${screenshot.id}`}
								className="w-full rounded-md"
								width={600}
								height={600}
							/>
						</a>
						<div className="flex flex-col">
							<p className="text-sm text-gray-600 mb-1">
								User ID: {screenshot?.userId}
							</p>
							{screenshot.user && (
								<>
									<p className="text-sm text-gray-600 mb-1">
										Name: {screenshot.user.name}
									</p>
									<p className="text-sm text-gray-600 mb-1">
										Email: {screenshot.user.email}
									</p>
									<p className="text-sm text-gray-600 mb-1">
										Username: {screenshot.user.username}
									</p>
								</>
							)}
							<p className="text-sm text-gray-600 mb-1">
								Created At: {formatDateTime(screenshot.createdAt)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Screenshots;
