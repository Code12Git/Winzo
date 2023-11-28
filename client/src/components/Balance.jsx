import React from "react";
import { motion } from "framer-motion";
import {NavLink} from 'react-router-dom'
const Balance = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <input type='text' className="p-2 rounded-lg" placeholder="Add transaction id ..." />
             <div className="bg-gradient-to-r rounded-full from-violet-500 to-pink-500  shadow-md p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
         
        <div className="flex flex-col sm:flex-row justify-between items-center">
         <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
           Available Balance: ₹0.00
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                  <NavLink to='/transaction'><motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} 
 className="bg-blue-500 cursor-pointer    text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
              Add Money
            </motion.div>
            </NavLink>
                              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} 

           className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
            Telegram
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
