import * as React from "react";
import { motion } from "framer-motion";
import { TopGames } from "./constants/TopGames"; // Import your data if it's not already imported
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Games = () => {
  return (
    <div className="flex flex-col p-4 md:p-10 lg:p-24 space-y-8 md:space-y-12 lg:space-y-14">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-orange-400 via-red-500 to-teal-600 text-transparent bg-clip-text">Top Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-16">
        {TopGames.map((item) => (
          <motion.div
            className="m-auto"
           variants={container}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.8, rotate: -180, borderRadius: "100%" }}
          >
            <div key={item.id} className="relative item" variants={item}>
              <img className="w-52 cursor-pointer bg-gradient-to-t hover:from-slate-900 hover:to-gray-950 rounded-lg h-72 md:w-64 md:h-80 lg:w-72 lg:h-96" src={item.imgUrl} alt="games" />
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white px-4 py-2 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer">
                <PlayCircleIcon className="text-red-600 " style={{height:'200px'}} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Games;
