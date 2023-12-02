import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import SideDrawer from "../common/SideDrawer";
import {motion } from 'framer-motion'
const textVariants={
  initial:{
    x:-500,
    opacity:0
  },
  animate:{
    x: 0,
    opacity:1,
    transition:{
      duration:1,
      staggeredChildren:0.1
    }
  },
  scrollButton:{
    opacity:0,
    y:10,
    transition:{
      duration:2,
      repeat:Infinity
    }
  }
}


const user=JSON.parse(localStorage.getItem('user'))






function Navbar() {

const handleLogout = () => {
  localStorage.removeItem('user'); 
  localStorage.removeItem('token');
  window.location.reload();
};


	 return (
    <div className="relative w-full">
      <div className="mx-auto navbar bg-gradient-to-r from-gray-900 to-slate-900 flex max-w-8xl items-center justify-between px-4 py-2 sm:px-6 lg:px-6">
        <div className="inline-flex p-4 items-center space-x-6">
          <motion.div variants={textVariants} initial='initial' animate='animate' className="flex items-center gap-2">
            <SideDrawer />
            <h1 className="text-lg lg:text-4xl font-roboto font-bold">
              <span className="text-gradient bg-gradient-to-r from-sky-700 to-cyan-800 bg-clip-text text-transparent">Bet</span>
              <span className="text-gradient lg:text-2xl  bg-gradient-to-r from-violet-900 via-red-500 to-pink-400 bg-clip-text text-transparent">Master</span>
            </h1>
          </motion.div>
        </div>

        <motion.div variants={textVariants} initial='initial' animate='animate' className="lg:block hidden lg:flex gap-2 items-center justify-center space-x-5">
          {user ? (
            <div className="flex items-center">
              <p className='bg-gradient-to-r from-red-400 via-green-400 to-purple-400 bg-clip-text text-transparent font-bold text-xl'>Logged in as: {user.name}</p>
              <button type="button" onClick={handleLogout} className="ml-2 bg-gradient-to-r from-red-400 via-green-400 to-purple-400 bg-clip-text text-transparent font-bold text-xl">Logout</button>
            </div>
          ) : (
            <>
              <button type="button"><LoginModal /></button>
              <button type="button"><RegisterModal /></button>
            </>
          )}
        </motion.div>
      </div>
    </div>
    )
}

export default Navbar;