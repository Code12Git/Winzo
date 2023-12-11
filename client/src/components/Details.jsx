import React, { useEffect } from 'react';

const Details = ({ fetchSession, session }) => {
  useEffect(() => {
    fetchSession();
  }, []);

  const lastThreeSessions = session?.slice(-5).reverse();

  return (
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
  );
};

export default Details;
