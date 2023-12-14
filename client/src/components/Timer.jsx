import  { useState, useEffect,useRef } from 'react';
import { privateRequest, publicRequest } from '../helpers/axios';
import BetResultModal from './modals/BetResultModel';

const Timer = () => {
  const [latestSession, setLatestSession] = useState('');
  const [session, setSession] = useState([]);
 
const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });
  const [isRed, setIsRed] = useState(false);
  const countdownIntervalRef = useRef(null); 
  const[latestBetDetails,setLatestBetDetails] = useState(null)
  const [showModal, setShowModal] = useState(false);
    
    

 const startCountdown = ({ minutes, seconds }) => {
  let remainingSeconds = minutes * 60 + seconds;
  clearInterval(countdownIntervalRef.current); 

  countdownIntervalRef.current = setInterval(() => {
    if (remainingSeconds > 0) {
      const mins = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;

      setCountdown({ minutes: mins, seconds: secs });

      if (remainingSeconds === 30) {
        fetchLatestSession();
        fetchAllSession();
        setShowModal(true);

        setIsRed(true);
      } else if (remainingSeconds <= 30 && remainingSeconds > 0) {
        setIsRed(true);
      } else {
        setIsRed(false);
      }

      remainingSeconds--; 
    } else {
      setIsRed(false);
      clearInterval(countdownIntervalRef.current);
      fetchRemainingTime();
    }
  }, 1000);
};
useEffect(() => {
  if (countdown.seconds === 33 && countdown.minutes === 0) {
    getSessionDetails();
  }
}, [countdown]);


  const getSessionDetails=async()=>{
  try{
    const response=await privateRequest.get('/bet');
   if (response.data.success === false && response.data.message === "User has not placed a bet for the latest session") {
  setLatestBetDetails(null);
} else {
  setLatestBetDetails(response.data.latestBet);
}
  }catch (error) {
    setLatestBetDetails(null)
  }
}

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

  const fetchAllSession = async () => {
    try {
      const sessionData = await publicRequest.get('/session');
      setSession(sessionData.data);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

const fetchLatestSession = async () => {
    try {
      const sessionData = await publicRequest.get('/session/latest-session');
      setLatestSession(sessionData.data.latestSessionId);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

   useEffect(() => {
  
  fetchLatestSession();
  fetchAllSession()
  getSessionDetails()
}, []); 

  useEffect(() => {
    fetchRemainingTime(); 
   const fetchInterval = setInterval(() => {
      fetchRemainingTime();
    }, 3 * 60 * 1000);
    return () => {
      clearInterval(countdownIntervalRef.current);
            clearInterval(fetchInterval); 

    };
  }, []);
const lastThreeSessions = session?.slice(-5).reverse();



  return (
    <>
      <div className='p-8 flex flex-col items-center justify-between md:flex-row'>
        <div className='mb-8 md:mr-4 text-center'>
          <h1 className='text-4xl font-bold mb-2 text-blue-800'>
            <i className='fas fa-cube mr-2 text-blue-500'>Session</i>
          </h1>
         <p className='text-2xl animate-beat text-blue-600'>{latestSession}</p>
        </div>
         <BetResultModal
   latestBetDetails={latestBetDetails}
    onClose={() => setShowModal(false)}
    show={showModal}
  />
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-2 text-yellow-800'>Count Down</h1>
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
        </div>
      </div>
      <div className="overflow-x-auto mt-8">
      <div className="w-full">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm md:text-base font-medium uppercase tracking-wider">
                Period
              </th>
              <th className="px-4 py-3 text-left text-sm md:text-base font-medium uppercase tracking-wider">
                Color
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lastThreeSessions?.map((data, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3">{data.id}</td>
                <td className="px-4 py-3">
                  <div className={`w-4 h-4 bg-${data.color}-400 rounded-full`}></div>
                </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Timer;
