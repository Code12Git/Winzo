import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Dice3Icon } from "lucide-react";
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
				icon: <CurrencyRupeeIcon />,
				title: "Add Money",
				link: "/transaction",
			},
			{
				icon: <AccountBalanceIcon />,
				title: "Transaction History",
				link: "/transaction-history",
			},
			{
				icon: <Dice3Icon />,
				title: "Bet History",
				link: "/previous-bet",
			}

		]
		: []),
];
