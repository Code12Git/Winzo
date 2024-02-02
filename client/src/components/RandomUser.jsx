import { useEffect, useState } from 'react';
import { privateRequest } from '../helpers/axios';

const RandomUser = () => {
    const [betData, setBetData] = useState(null);
    const [error, setError] = useState(null);
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await privateRequest.get('/randomuser');
                setBetData(response.data.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };

        // Fetch initial data only if betData is not already populated
        if (!betData) {
            fetchData();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleIndex((prevIndex) => (prevIndex + 1) % betData.length);
        }, 3000); // Adjust the interval duration (in milliseconds) as needed

        return () => {
            clearInterval(interval);
        };
    }, [betData]);

    const renderNames = () => {
        return betData.map((item, index) => (
            <div
                key={index}
                className={`flex flex-col items-center ${index === visibleIndex ? 'visible' : 'hidden'}`}
            >
                <h2 className="bg-gradient-to-r hover:animate-bounce font-bold from-orange-500  via-red-500 to-pink-500 text-transparent text-2xl bg-clip-text">
                    🔥{item.name}🔥
                </h2>
                <p className="bg-gradient-to-r font-bold hover:animate-pulse from-blue-500 text-xl via-green-500 to-green-600 text-transparent bg-clip-text">
                    Won: {item.won}
                </p>
            </div>
        ));
    };
    return (
        <div className='mb-16'>
            <div>
                {error ? (
                    <div className='text-red-500'>
                        <p>{error}</p>
                    </div>
                ) : (
                    betData && renderNames()
                )}
            </div>
        </div>
    );
};

export default RandomUser;
