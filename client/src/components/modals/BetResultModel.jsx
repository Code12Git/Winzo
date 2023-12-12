import React from 'react';
import Modal from 'react-modal';

const BetResultModal = ({ show, result, onClose, payout }) => {
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
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      {user && (
        <Modal
          isOpen={show}
          onRequestClose={onClose}
          style={customStyles}
          contentLabel="Bet Result Modal"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Bet Result</h2>
          {result ? (
            <p className="text-xl text-white mb-6 bg-gradient-to-r from-purple-500 via-violet-400 to-red-400 bg-clip-text text-transparent">
              {result}
            </p>
          ) : (
            <p className="text-xl text-white mb-6">You didn't place a bet for this session.</p>
          )}

          <h2 className="text-2xl font-bold mb-4 text-white">Payout</h2>
          <p className="text-xl text-white mb-6">{payout}</p>
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

export default BetResultModal;
