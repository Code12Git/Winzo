import  { useState, useEffect} from 'react';
import { privateRequest, publicRequest } from '../helpers/axios';
import BetResultModal from './modals/BetResultModel';
import io from "socket.io-client";
import CustomToast from './common/CustomToast';

const Timer = () => {
 const [latestSession, setLatestSession] = useState('');
const [session, setSession] = useState([]);
const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });
const [isRed, setIsRed] = useState(false);
const [latestBetDetails, setLatestBetDetails] = useState(null);
const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

const fetchAllSession = async () => {
  try {
    const sessionData = await publicRequest.get('/session');
    setSession(sessionData.data);
  } catch (error) {
// 
  }
};

const fetchLatestSession = async () => {
  try {
    const sessionData = await publicRequest.get('/session/latest-session');
    setLatestSession(sessionData.data.latestSessionId);
  } catch (error) {
    console.error('Error fetching latest session:');
  }
};



useEffect(() => {
  const socket = io("http://localhost:7000");

  const fetchModalState = async () => {
  try {
    const res = await privateRequest.get('/modal/usermodalstate');
    if (res.data && res.data.success === true) {
      if (res.data.data.isOpen) {
        setShowModal(true);
      }
    }
  } catch (err) {
// 
  }
};


 const handleRemainingTime = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  setCountdown({ minutes, seconds });

  if (minutes === 0 && seconds >= 28 && seconds <= 30) {
    fetchModalState();
    fetchLatestSessionAndAll();
  }

  if (minutes === 0 && seconds === 26 && !showToast) {
    setShowToast(true);
  } else if (seconds !== 26) {
      setShowToast(false);
      
    }

  if (minutes === 0 && seconds <= 30) {
    setIsRed(true);
  } else {
    setIsRed(false);
  }

  if (minutes === 0 && seconds >= 32 && seconds <= 33) {
    getSessionDetails();
  }
  

   
  };

  socket.on("remainingTime", handleRemainingTime);

  return () => {
    socket.off("remainingTime", handleRemainingTime);
    socket.disconnect();
  };
},  []);




const fetchLatestSessionAndAll = async () => {
  try {
    await fetchLatestSession();
    await fetchAllSession();
  } catch (error) {
// 
  }
};

const getSessionDetails = async () => {
  try {
    const response = await privateRequest.get('/bet');
    if (response.data.success === false && response.data.message === "User has not placed a bet for the latest session") {
      setLatestBetDetails(null);
    } else {
      setLatestBetDetails(response.data.latestBet);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setLatestBetDetails(null);
    } else {
      // Handle other errors and log to console
      console.error('Error fetching bet details:', error);
      // setLatestBetDetails(null); // You might choose to set to null or handle differently
    }
  }
};


useEffect(() => {
  fetchLatestSessionAndAll();
  getSessionDetails();
}, []);





const lastThreeSessions = session?.slice(-5).reverse();
const user = JSON.parse(localStorage.getItem('user'));



  return (
    <>
      <div className='p-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
        
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-4xl font-bold mb-2 text-blue-800'>
            <i className='fas fa-cube mr-2 text-blue-500'>Session</i>
          </h1>
         <p className='text-2xl animate-beat text-blue-600'>{latestSession}</p>
        </div>
       {user&& <BetResultModal
   latestBetDetails={latestBetDetails}
    onClose={() => setShowModal(false)}
    show={showModal}
  />}
   {user &&  (
        <CustomToast
          latestBetDetails={latestBetDetails}
          showToast={showToast}
        />
      )}
        <div className='flex flex-col gap-2 items-center'>
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
