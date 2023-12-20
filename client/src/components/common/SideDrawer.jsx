import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { SidebarLinks } from "../constants/SidebarLinks";
import { NavLink } from 'react-router-dom'

const SidebarContent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
const handleLogout = () => {
  localStorage.removeItem('user'); 
  localStorage.removeItem('token');
  window.location.reload();
};
  return (
    <div className="bg-gradient-to-b border-r border-gray-400 md:block from-slate-900 via-gray-900 to-zinc-900 opacity-90 h-screen w-72">
      <div className="p-6 w-72 font-bold text-white space-y-4 md:space-y-10">
        <div className="text-2xl md:text-3xl flex flex-col gap-4 md:gap-8">
          <p className="bg-gradient-to-r from-orange-500 via-red-400 to-blue-400 text-transparent bg-clip-text text-3xl">
           ColorBet
          </p>

          {SidebarLinks.map((item) => (
            <NavLink to={item.link} key={item.title}>
              <motion.div
                className="flex flex-col md:flex-row items-center justify-between cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
              >
                <div className="flex bg-gradient-to-r hover:from-purple-900 hover:via-violet-900 hover:to-purple-900 w-full p-1 rounded-lg items-center gap-1">
                  <p>{item.icon}</p>
                  <p className="text-md md:text-lg">{item.title}</p>
                </div>
              </motion.div>
            </NavLink>
          ))}

          {user && (
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
            >
              <button onClick={handleLogout}  className="flex bg-gradient-to-r from-red-700 to-green-700 w-full p-1 rounded-lg items-center gap-1">
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SideDrawer() {
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {(["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon className="text-black" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <SidebarContent open={state[anchor]} />
          </Drawer>
        </React.Fragment>
      )))}
    </div>
  );
}
