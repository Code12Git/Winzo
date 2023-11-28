import React, { useState, useEffect } from 'react';

const Countdown = ({onCountdownEnd}) => {
  const initialCountdown = {
    minutes: 1,
    seconds: 0,
  };

  const [countdown, setCountdown] = useState(initialCountdown);
    const [countdownEnded, setCountdownEnded] = useState(false);

  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => {
        const updatedCountdown = { ...prevCountdown };

        if (updatedCountdown.seconds > 0) {
          updatedCountdown.seconds--;
        } else {
          if (updatedCountdown.minutes === 0) {
            // When countdown reaches 0:00
            setIsRed(false);
            return { minutes: 1, seconds: 0 };
          }
          updatedCountdown.seconds = 59;
          updatedCountdown.minutes--;
        }

       if (updatedCountdown.minutes === 0 && updatedCountdown.seconds === 0) {
  setIsRed(false);
  setCountdownEnded(true);
  clearInterval(countdownInterval);
  onCountdownEnd();


        } else {
          setIsRed(false);
        }

        localStorage.setItem('countdown', JSON.stringify(updatedCountdown));
        return updatedCountdown;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdown.minutes, countdown.seconds]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className={`flex flex-col ${isRed ? 'text-red-600' : 'text-black'}`}>
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": countdown.minutes }}>{countdown.minutes}</span>
        </span>
        min
      </div>
      <div className={`flex flex-col ${isRed ? 'text-red-600' : 'text-black'}`}>
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": countdown.seconds }}>{countdown.seconds}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
