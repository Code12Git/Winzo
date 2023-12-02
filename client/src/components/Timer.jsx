import React, { useState, useEffect } from 'react';
import Countdown from './common/Countdown';
import { publicRequest } from './helpers/axios';
import Details from './Details';
const Timer = () => {
  const [latestSession, setLatestSession] = useState(''); 
  const [session, setSession] = useState();

  useEffect(()=>{
  fetchSession()
  },[])
  const fetchSession = async () => {
    try {
      const sessionData = await publicRequest.get('/session/latest-session');
      setLatestSession(sessionData.data.latestSessionName)
          
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

  const fetchAllSession = async () => {
    try {
      const sessionData = await publicRequest.get('/session');
      setSession(sessionData.data);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };
  
  return (
    <>
    <div className='p-8 flex flex-col items-center justify-between md:flex-row'>
      {/* Display Session Information */}
     <div className='mb-8 md:mr-4 text-center'>
        <h1 className='text-4xl font-bold mb-2 text-blue-800'>
          <i className='fas fa-cube mr-2 text-blue-500'>Session</i>
        </h1>
        <p className='text-2xl animate-beat text-blue-600'>{latestSession}</p>
      </div>

      {/* Display Countdown */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-2 text-yellow-800'>Count Down</h1>
        {/* Pass the function to update session as a prop */}
        <Countdown fetchLatestSession={fetchSession} fetchSession={fetchAllSession}  />
      </div>
    </div>
      <Details fetchSession={fetchAllSession} session={session} />
      </>

  );
};

export default Timer;

