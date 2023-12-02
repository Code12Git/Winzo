import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";

export const SidebarLinks = [
	{
		icon: <HomeOutlinedIcon />,
		title: "Home",
		link: "/",
	},

	{
		icon: <SportsSoccerOutlinedIcon />,
		title: "Sport",
		showDropdown: true,
	},
];
