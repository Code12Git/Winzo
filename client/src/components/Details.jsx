import React, { useState } from 'react';
import { useEffect } from 'react';
import { privateRequest } from '../helpers/axios';
const Details = () => {
  const [session,setSession]=useState()
  useEffect(() => {
  const fetchSession = async () => {
    try {
      const sessionData = await privateRequest.get('/session');
      console.log(sessionData.data);
      setSession(sessionData.data);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

  const interval = setInterval(fetchSession, 60000); 

  return () => clearInterval(interval);
}, []);
    const lastThreeSessions = session?.slice(-3).reverse(); 

  return (
    <div className="overflow-x-auto mt-20">
      <div className="w-full">
        <table className="w-full divide-y divide-gray-200 bg-gradient-to-br from-blue-300 to-purple-300">
          <thead className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <tr>
            <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider">Period</th>
              <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider">Number</th>
              <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider">Result</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
           {lastThreeSessions?.map((data)=>( <tr>
              <td className="px-4 py-3 sm:px-6 sm:py-4">{data.id}</td>
              <td className="px-4 py-3 sm:px-6 sm:py-4">{data.price}</td>
              <td className="px-4 py-3 sm:px-6 sm:py-4">{data.number}</td>
              <td className="px-4 py-3 sm:px-6 sm:py-4 "> <div className={`w-4 h-4 bg-${data.color}-400 rounded-full`}></div></td>
            </tr>))}
           
           
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Details;
