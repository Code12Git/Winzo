import React, { useState, useEffect } from 'react';
import { publicRequest } from '../helpers/axios';

const Countdown = ({fetchLatestSession,fetchSession}) => {
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });
  const [isRed, setIsRed] = useState(false);

 useEffect(() => {
  let countdownInterval;

  const fetchRemainingTime = async () => {
    try {
      const response = await publicRequest.get('/session/remaining');
      const data = response.data;
      const formattedTime = data.remainingTime;

      const timeParts = formattedTime.match(/(\d+) minutes (\d+) seconds/);
      if (timeParts && timeParts.length === 3) {
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);
        setCountdown({ minutes, seconds });
        startCountdown({ minutes, seconds });
      }
    } catch (error) {
      console.error('Error fetching remaining time:', error);
    }
  };

 const startCountdown = ({ minutes, seconds }) => {
  let remainingSeconds = minutes * 60 + seconds;

  countdownInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;

      const mins = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;

      setCountdown({ minutes: mins, seconds: secs });

      if (remainingSeconds <= 20 && remainingSeconds > 0) {
        setIsRed(true);
      } else {
        setIsRed(false);
      }
      
      if (remainingSeconds === 20) {
        fetchLatestSession();
        fetchSession();
      }
    } else {
      setIsRed(true);
      clearInterval(countdownInterval);
      fetchRemainingTime();
    }
  }, 1000);
};

  fetchRemainingTime();

  return () => {
    clearInterval(countdownInterval);
  };
}, [fetchLatestSession, fetchSession]);




  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className={`flex flex-col ${isRed ? 'text-red-600' : 'text-black'}`}>
        <span className="countdown font-mono text-5xl">
          <span style={{ '--value': countdown.minutes }}>{String(countdown.minutes).padStart(2, '0')}</span>
        </span>
        min
      </div>
      <div className={`flex flex-col ${isRed ? 'text-red-600' : 'text-black'}`}>
        <span className="countdown font-mono text-5xl">
          <span style={{ '--value': countdown.seconds }}>{String(countdown.seconds).padStart(2, '0')}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
