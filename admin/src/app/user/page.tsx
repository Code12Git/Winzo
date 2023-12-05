import UserCards from "@/components/User/UserCards";
import RouteGuard from "@/components/RouteGuard";

const page = () => {
	return (
		<div className="p-12 bg-gradient-to-r from-gray-700 via-slate-800 to-zinc-800 h-full">
			<RouteGuard allowedRoles={["SuperAdmin"]}>
				<UserCards />
			</RouteGuard>
		</div>
	);
};

export default page;
