import RouteGuard from "@/components/RouteGuard";
import UserCards from "@/components/User/UserCards";
export default function Home() {
	return (
		<main className="p-4 bg-gradient-to-r from-gray-700 via-slate-800 to-zinc-800 h-full">
			<RouteGuard allowedRoles={["SuperAdmin"]}>
				<UserCards />
			</RouteGuard>
		</main>
	);
}
