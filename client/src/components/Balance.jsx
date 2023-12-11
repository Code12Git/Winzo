import React,{useEffect,useState} from "react";
import { motion } from "framer-motion";
import { privateRequest } from "../helpers/axios";
import {NavLink} from 'react-router-dom'
import toast from "react-hot-toast";
const Balance = () => {
  const [balance, setBalance] = useState(
		null
);
useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await privateRequest.get('/transaction/balance');
        if (res.data && res.data.success === true) { 
          setBalance(res.data.balance); 
        }
      } catch (err) {
      console.error(err)
      }
    };

    const interval = setInterval(fetchBalance, 10000); 
    fetchBalance();

    return () => clearInterval(interval);
  }, []); 

  const user = JSON.parse(localStorage.getItem('user'));


 return (
<div className="flex flex-col gap-4">
  <div className="bg-gradient-to-r rounded-full from-violet-500 to-pink-500 shadow-md p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-2xl  sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
        Available Balance: ₹{balance}
      </h1>
      <div className="flex items-center flex-wrap gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
    


        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
         className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Telegram
        </motion.div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Balance;
