"use client";
import React, { useState, useEffect } from "react";

const SessionModal = () => {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const modalTimer = setInterval(() => {
			// After 1 minute, show the modal
			setShowModal(true);
			// Clear the modal after 5 seconds
			setTimeout(() => {
				setShowModal(false);
			}, 5000);
		}, 60000); // 1 minute interval

		// After 10 minutes, request to create a session
		const sessionTimer = setTimeout(() => {
			alert("Hey! Create a session now.");
		}, 600000); // 10 minutes interval

		// Clearing timers on component unmount
		return () => {
			clearInterval(modalTimer);
			clearTimeout(sessionTimer);
		};
	}, []);

	return (
		<div>
			{showModal && (
				<div className="modal">
					{/* Your modal content */}
					<p>This is the Session Modal</p>
				</div>
			)}
		</div>
	);
};

export default SessionModal;
