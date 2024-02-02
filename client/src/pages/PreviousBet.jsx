import { privateRequest } from "../helpers/axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const PreviousBet = () => {
    const [betDetails, setBetDetails] = useState([]);

    useEffect(() => {

        fetchLatestBet();
    }, []);
    const fetchLatestBet = async () => {
        try {
            const res = await privateRequest.get('/bet/recent-bet');
            setBetDetails(res.data.recentBets);
        } catch (error) {
            console.error("Error fetching bet details:", error);
        }
    };


    useEffect(() => {
        const socket = io("http://localhost:7000");

        const handleRemainingTime = ({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);

            if (minutes === 0 && seconds >= 0 && seconds <= 30) {
                fetchLatestBet();
            }
        };


        socket.on("remainingTime", handleRemainingTime);

        return () => {
            socket.off("remainingTime", handleRemainingTime);
            socket.disconnect();
        };
    }, []);

    const formatDateTime = (timestamp) => {
        const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
        return new Date(timestamp).toLocaleString(undefined, options);
    };

    return (
        <div className="overflow-x-auto mt-8">
            <div className="w-full">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm md:text-base font-medium uppercase tracking-wider">
                                Color
                            </th>
                            <th className="px-4 py-3 text-left text-sm md:text-base font-medium uppercase tracking-wider">
                                Bet Amount
                            </th>
                            <th className="px-4 py-3 text-left text-sm md:text-base font-medium uppercase tracking-wider">
                                Payout
                            </th>
                            <th className="px-4 py-3 text-left text-sm md:text-base font-medium uppercase tracking-wider">
                                Winner
                            </th>
                            <th className="px-4 py-3 text-left text-sm md:text-base font-medium uppercase tracking-wider">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {betDetails.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-4 py-3">
                                    <div className={`w-4 h-4 bg-${data.color}-400 rounded-full`}></div>
                                </td>
                                <td className="px-4 py-3">{data.betAmount}</td>
                                <td className="px-4 py-3">{data.payout}</td>
                                <td className="px-4 py-3">{data.isWinner ? "Won" : "Lost"}</td>
                                <td className="px-4 py-3">{formatDateTime(data.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PreviousBet;
