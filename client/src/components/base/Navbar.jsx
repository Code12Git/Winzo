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
      <div className="mx-auto navbar   flex max-w-8xl items-center justify-between px-4 py-2 sm:px-6 lg:px-6">
       <div className="inline-flex p-4 items-center space-x-6">
          <motion.div variants={textVariants} initial='initial' animate='animate' className="flex items-center gap-2">
           <SideDrawer  />
           <div className="flex flex-row gap-1 items-center">
                        <img src='/logo.png' className="w-10" alt='colorBat' />

          <h1 className="text-lg lg:text-4xl font-bold font-serif">
  <span className="text-gradient bg-gradient-to-r from-sky-700 to-cyan-800 bg-clip-text text-transparent">Color</span>
  <span className="text-gradient lg:text-2xl  bg-gradient-to-r from-violet-900 via-red-500 to-pink-400 bg-clip-text text-transparent">Bat</span>
</h1>

</div>

          </motion.div>
        </div>

       <motion.div variants={textVariants} initial='initial' animate='animate' className="  lg:flex gap-2 flex-wrap items-center justify-center space-x-2">
          {user ? (
            <div className="flex flex-wrap items-center">
<p className='text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-red-700 to-green-700'>{user.name}</p>
              <button type="button" onClick={handleLogout} className="ml-2 bg-gradient-to-r text-2xl font-bold text-transparent bg-clip-text from-red-700 to-green-700 ">Logout</button>
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