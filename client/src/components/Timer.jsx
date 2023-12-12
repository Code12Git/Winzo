import  { useState,useRef, useEffect } from 'react';
import Countdown from './common/Countdown';
import { publicRequest } from '../helpers/axios';
import Details from './Details';

const Timer = () => {
  const [latestSession, setLatestSession] = useState('');
  const [session, setSession] = useState([]);
  const [remainingTime, setRemainingTime] = useState('');
  const initialTimeRef = useRef('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchRemainingTime = async () => {
    try {
      const response = await publicRequest.get('/session/remaining');
      const currentRemainingTime = response.data.remainingTime;

      if (currentRemainingTime !== initialTimeRef.current) {
        initialTimeRef.current = currentRemainingTime;
        fetchSession();
      }

      setRemainingTime(currentRemainingTime);
    } catch (error) {
      console.error('Error fetching remaining time:', error);
    }
  };

  const fetchSession = async () => {
    try {
      const sessionData = await publicRequest.get('/session/latest-session');
      setLatestSession(sessionData.data.latestSessionId);
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

  useEffect(() => {
    if (remainingTime === '0 minutes 30 seconds') {
      fetchSession();
    }
  }, [remainingTime]);

  return (
    <>
      <div className='p-8 flex flex-col items-center justify-between md:flex-row'>
        <div className='mb-8 md:mr-4 text-center'>
          <h1 className='text-4xl font-bold mb-2 text-blue-800'>
            <i className='fas fa-cube mr-2 text-blue-500'>Session</i>
          </h1>
          <p className='text-2xl animate-beat text-blue-600'>{latestSession}</p>
        </div>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-2 text-yellow-800'>Count Down</h1>
          <Countdown />
        </div>
      </div>
      <Details fetchSession={fetchAllSession} session={session} />
    </>
  );
};

export default Timer;
