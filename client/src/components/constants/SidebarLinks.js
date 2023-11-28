import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
export const SidebarLinks = [
	{
		icon: <HomeOutlinedIcon />,
		title: "Home",
		link: "/",
	},
	{
		icon: <SportsEsportsOutlinedIcon />,
		title: "Games",
		showDropdown: true,
	},
	{
		icon: <CasinoOutlinedIcon />,
		title: "LiveCasino",
		showDropdown: true,
	},
	{
		icon: <SportsSoccerOutlinedIcon />,
		title: "Sport",
		showDropdown: true,
	},
	{
		icon: <CardGiftcardOutlinedIcon />,
		title: "Promotions",
	},
	{
		icon: <CelebrationOutlinedIcon />,
		title: "Highroller Party",
	},
	{
		icon: <CakeOutlinedIcon />,
		title: "Lucky Loot",
	},
	{
		icon: <EmojiEventsOutlinedIcon />,
		title: "Tournaments",
	},
	{
		icon: <QuizOutlinedIcon />,
		title: "Personality Quiz",
	},
	{
		icon: <CurrencyBitcoinOutlinedIcon />,
		title: "About Crypto",
	},
	{
		icon: <MoreHorizOutlinedIcon />,
		title: "More",
		showDropdown: true,
	},
];
