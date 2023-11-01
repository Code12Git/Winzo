import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
// import SideDrawer from "../common/SideDrawer";

const menuItems = [
	{
		name: "SPORT",
		href: "#",
	},
	{
		name: "LIVE BETTING",
		href: "#",
	},
	{
		name: "LIVE CASINO",
		href: "#",
	},
	{
		name: "GAMES",
		href: "#",
	},
	{
		name: "PROMOTIONS",
		href: "#",
	},
	{
		name: "VIP",
		href: "#",
	},
];

function Navbar() {
	return (
		<div className="relative w-full bg-white">
			<div className="mx-auto navbar bg-neutral text-neutral-content flex max-w-8xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
				<div className="inline-flex p-4 items-center space-x-6">
					{/* <SideDrawer /> */}
					<div className="flex items-center gap-2">
						<img
							src="/assets/Betting.jpeg"
							className="w-10  h-10 lg:w-12 lg:h-12 rounded-3xl"
							alt="Logo"
						/>
						<h1 className="text-lg lg:text-3xl font-roboto">
							<span className="lg:text-4xl">Bet</span>
							<span className="lg:text-lg text-gray-300">Master</span>
						</h1>
					</div>
				</div>
				<div className="hidden lg:block">
					<ul className="inline-flex space-x-8">
						{menuItems.map((item) => (
							<li
								key={item.name}
								className="text-md text-white font-bold hover:scale-105 transition-transform ease-in-out delay-150 duration-150"
							>
								<a href={item.href}>{item.name}</a>
							</li>
						))}
					</ul>
				</div>
				<div className="lg:block space-x-5">
					<button type="button">
						<LoginModal />
					</button>
					<button type="button">
						<RegisterModal />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
