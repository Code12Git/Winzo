import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const user = JSON.parse(localStorage.getItem("user"));

export const SidebarLinks = [
	{
		icon: <HomeOutlinedIcon />,
		title: "Home",
		link: "/",
	},
	...(user
		? [
				{
					icon: <CreditCardIcon />,
					title: "Withdrawal Money",
					link: "/withdrawal",
				},
				{
					icon: <AttachMoneyIcon />,
					title: "Add Money",
					link: "/transaction",
				},
		  ]
		: []),
];
