import React from 'react';
import Countdown from './common/Countdown';
import { motion } from 'framer-motion';

const Timer = ({onCountdownEnd}) => {
  const animationProps = {
    animate: {
      scale: [1, 2, 2, 1, 1],
      borderRadius: ['0%', '0%', '50%', '50%', '0%'],
   },
    transition: {
      duration: 2,
      ease: 'easeInOut',
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 1,
    },
  };

  return (
    <div className='p-8 flex flex-col items-center justify-between md:flex-row'>
      {/* Session */}
      <div  className='mb-8 md:mr-4 text-center'>
        <h1 className='text-4xl font-bold mb-2 text-blue-800'>
          <i className='fas fa-cube mr-2 text-blue-500'>Session</i>
        </h1>
        <p className='text-2xl animate-beat text-blue-600'>20230831161</p>
      </div>

      {/* Countdown */}
      <div   className='text-center'>
        <h1 className='text-4xl font-bold mb-2 text-yellow-800'>Count Down</h1>
        <Countdown onCountdownEnd={onCountdownEnd}/>
      </div>
   </div>
  );
};

export default Timer;
