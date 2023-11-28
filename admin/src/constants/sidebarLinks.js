import { Payment, PermDataSettingOutlined } from "@mui/icons-material";
import { LayoutDashboardIcon, User, SortDescIcon } from "lucide-react";

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
];
