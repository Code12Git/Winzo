import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

const CustomToast = ({ latestBetDetails, showToast }) => {
  useEffect(() => {
    let toastId = null;

    if (showToast && latestBetDetails !== null && toastId === null) {
      toastId = toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-white ring-opacity-5`}
        >
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=826&t=st=1703145524~exp=1703146124~hmac=dff8a3ee4aa8e384bf3ed5b31467f4b77e83f361bc1d2643f1f8aff2d2fe2e5e"
                  alt=""
                />
              </div>
              <div className="ml-4">
                {latestBetDetails !== null ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-black">Bet Result</h2>
                    {latestBetDetails?.isWinner ? (
                      <p className="text-xl text-black mb-6 bg-gradient-to-r from-purple-700 via-violet-700 to-red-700 bg-clip-text text-transparent">
                        Congratulations you won
                      </p>
                    ) : (
                      <p className="text-xl text-black mb-6">You didn{"'"}t win this time.</p>
                    )}

                    <h2 className="text-2xl font-bold mb-4 text-white">Latest Bet Details</h2>
                    <p className="text-xl text-black mb-6">Bet Amount: {latestBetDetails.betAmount}</p>
                    <p className="text-xl text-black mb-6">Selected Color: {latestBetDetails.color}</p>
                    <p className="text-xl text-black mb-6">Payout: {latestBetDetails.payout}</p>
                  </>
                ) : (
                  <p className="text-xl text-black mb-6">No bet placed for the latest session.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                toast.dismiss(toastId);
                toastId = null;
              }}
              className="border-l border-gray-200 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }

    return () => {
      if (toastId !== null) {
        toast.dismiss(toastId);
        toastId = null;
      }
    };
  }, [showToast, latestBetDetails]);

  return null; // Return null as the toast is triggered through the useEffect
};

CustomToast.propTypes = {
  latestBetDetails: PropTypes.shape({
    isWinner: PropTypes.bool,
    betAmount: PropTypes.number,
    color: PropTypes.string,
    payout: PropTypes.number,
  }),
  showToast: PropTypes.bool.isRequired,
};

export default CustomToast;
