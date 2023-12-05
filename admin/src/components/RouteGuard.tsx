"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type AllowedRoles = string[];

function RouteGuard({
	allowedRoles,
	children,
}: {
	allowedRoles: AllowedRoles;
	children: React.ReactNode;
}) {
	const router = useRouter();

	useEffect(() => {
		const userString = localStorage.getItem("user");
		if (!userString) {
			router.push("/login");
			return;
		}

		try {
			const user = JSON.parse(userString);
			const role = user?.user?.Role || null;

			if (!role || !allowedRoles.includes(role)) {
				router.push("/login");
			}
		} catch (error) {
			console.error("Error parsing user data:", error);
			router.push("/login");
		}
	}, [allowedRoles, router]);

	return <>{children}</>;
}

export default RouteGuard;
