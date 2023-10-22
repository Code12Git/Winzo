import React from "react";

const AccessDenied = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
				<p className="text-gray-600">
					You don{"'"}t have permission to access this page.
				</p>
			</div>
		</div>
	);
};

export default AccessDenied;
