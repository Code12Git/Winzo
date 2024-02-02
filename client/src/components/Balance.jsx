import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { privateRequest } from "../helpers/axios";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import toast from 'react-hot-toast'
// import toast from "react-hot-toast";
const Balance = () => {
  const [balance, setBalance] = useState(null);
  // const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:7000");

    const handleRemainingTime = ({ remainingTime }) => {
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      if ((minutes === 2 && seconds === 59) || (minutes === 0 && seconds >= 8 && seconds <= 10)) {
        // Store the balance in local storage at the start of the session
        localStorage.setItem("previousSessionBalance", JSON.stringify(balance));
      }

      if (minutes === 0 && seconds >= 8 && seconds <= 10) {
        // Fetch balance when remaining seconds are between 8 and 10
        fetchBalance();
      }


    };

    socket.on("remainingTime", handleRemainingTime);

    return () => {
      socket.off("remainingTime", handleRemainingTime);
      socket.disconnect();
    };
  }, [balance]);

  const fetchBalance = async () => {
    try {
      const res = await privateRequest.get('/transaction/balance');
      if (res.data && res.data.success === true) {
        setBalance(res.data.balance);
        localStorage.setItem("userBalance", JSON.stringify(res.data.balance));
        const previousSessionBalance = localStorage.getItem("previousSessionBalance");
        if (!previousSessionBalance) {
          localStorage.setItem("previousSessionBalance", JSON.stringify(res.data.balance));
        }
      }
    } catch (err) {
      // Handle error
    }
  };
  const balancetoast = () => {
    if (balance > 500000) {
      toast.error("Please contact customer support your balance exceeed 5 lakh");
    }
  }
  useEffect(() => {
    // Fetch initial balance or use the previous session balance
    const previousSessionBalance = localStorage.getItem("previousSessionBalance");
    if (previousSessionBalance) {
      setBalance(JSON.parse(previousSessionBalance));
    } else {
      fetchBalance();
      balancetoast()
    }
  }, []);


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
              className="bg-green-500 flex gap-2 mt-4 md:mt-0 lg:mt-0 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
            >

              <NavLink to='/help'>Contact Us</NavLink>

            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="bg-blue-500 flex gap-2 mt-4 md:mt-0 lg:mt-0 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >

              <a href='https://t.me/+PYo_HkXySYowYzJl' target="_blank" rel="noreferrer">Telegram</a>

            </motion.div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Balance;
