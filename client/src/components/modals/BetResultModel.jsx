import Modal from 'react-modal';
import PropTypes from 'prop-types';

const BetResultModal = ({
 
 
  
  onClose,
  show,
  latestBetDetails,
}) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '1000',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      border: 'none',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    },
  };
console.log(latestBetDetails)
 
  return (
    <div>
      {show && (
        <Modal
          isOpen={show}
         onRequestClose={onClose}
          style={customStyles}
          contentLabel="Bet Result Modal"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Bet Result</h2>
         {latestBetDetails !== null && (
  latestBetDetails.isWinner ? (
    <p className="text-xl text-white mb-6 bg-gradient-to-r from-purple-500 via-violet-400 to-red-400 bg-clip-text text-transparent">
      Congratulations you won
    </p>
  ) : (
    <p className="text-xl text-white mb-6">
      You didn{"'"}t win this time.
    </p>
  )
)}


          <h2 className="text-2xl font-bold mb-4 text-white">
            Latest Bet Details
          </h2>
          {latestBetDetails ? (
            <>
              <p className="text-xl text-white mb-6">
                Bet Amount: {latestBetDetails.betAmount}
              </p>
              <p className="text-xl text-white mb-6">
                Selected Color: {latestBetDetails.color}
              </p>
              <p className="text-xl text-white mb-6">
                Payout: {latestBetDetails.payout}
              </p>
            </>
          ) : (
            <p className="text-xl text-white mb-6">
              No bet placed for the latest session.
            </p>
          )}
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

BetResultModal.propTypes = {

  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  latestBetDetails: PropTypes.shape({
    isWinner: PropTypes.bool.isRequired,
    betAmount: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    payout: PropTypes.number.isRequired,
  }),
};

export default BetResultModal;
