import { Payment, PermDataSettingOutlined } from "@mui/icons-material";
import { LayoutDashboardIcon, User, SortDescIcon } from "lucide-react";
import { Screenshot } from "@mui/icons-material";
import { AccountBalance } from "@mui/icons-material";
import { User2 } from "lucide-react";
export const sidebarLinks = [
	{
		id: 1,
		icon: <LayoutDashboardIcon />,
		route: "/",
		label: "Dashboard",
	},
	{
		id: 2,
		icon: <User />,
		route: "/user",
		label: "User",
	},
	{
		id: 3,
		icon: <SortDescIcon />,
		route: "/session",
		label: "Session",
	},
	{
		id: 4,
		icon: <Payment />,
		route: "/transactions",
		label: "Transaction",
	},
	{
		id: 5,
		icon: <PermDataSettingOutlined />,
		route: "/qrcode",
		label: "QrCode",
	},
	{
		id: 5,
		icon: <Screenshot />,
		route: "/screenshots",
		label: "Screenshot",
	},
	{
		id: 6,
		icon: <AccountBalance />,
		route: "/balance",
		label: "Balance",
	},
	{
		id: 7,
		icon: <User2 />,
		route: "/randomuser",
		label: "RandomUser",
	},
];
