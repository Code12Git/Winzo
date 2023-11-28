import { FeaturesProvided } from "./constants/Features";
import {motion} from 'framer-motion'
import {NavLink} from 'react-router-dom'
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


const Features = () => {
  return (
    <motion.div  
    variants={textVariants}
    initial="initial"
    animate="animate" className="flex flex-wrap items-center justify-center space-x-5 mt-10">
      {FeaturesProvided?.map((feature) => (
        <NavLink to={feature.link}
     className="  flex  gap-4 border cursor-pointer border-gray-700 hover:scale-110 transition-transform ease-in-out delay-200 duration-300 p-3 rounded-lg  text-white" key={feature.id}>
        <p className={`${feature.color}` }>{feature.icon}</p>
         <p >{feature.text}</p>
        </NavLink>
      ))}
    </motion.div>
  );
};

export default Features;