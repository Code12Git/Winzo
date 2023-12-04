import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { privateRequest } from '../../helpers/axios';
import toast from 'react-hot-toast'
export default function RedModal() {
  let [isOpen, setIsOpen] = useState(false)
 const [selectedNumber, setSelectedNumber] = useState(1);
  const [betAmount, setBetAmount] = useState(100);
  const [selectedColor, setSelectedColor] = useState('red');

  

  const calculatePotentialWin = () => {
    let potentialWin = betAmount * 2; 

    if (selectedColor === 'red') {
     if (selectedNumber === 1 || selectedNumber === 3 || selectedNumber === 5) {
        potentialWin = betAmount * 4; 
      }
    }
    return potentialWin;
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleNumberSelection = (number) => {
    setSelectedNumber(number);
  };

  const handleBetAmountSelection = (amount) => {
    setBetAmount(amount);
  };
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    setSelectedColor('red')
  }

    const handleIncrement = () => {
   setBetAmount(betAmount + 1);
  };

  const handleDecrement = () => {
    if (betAmount > 1) {
      setBetAmount(betAmount - 1);
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  
  const handleSubmit = async () => {
    try {
      const response = await privateRequest.post('/bet', {
        color: selectedColor,
        number: selectedNumber,
        betAmount: betAmount,
      });
      
      toast.success('Bet placed Successfully!')
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error(error.message)
    }
  };


  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Red
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
       {user?( <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Select Color
                  </Dialog.Title>
                  <div className="mt-6 flex flex-col gap-8">
                    
                    <div className='flex flex-col justify-between mt-4 gap-4'>
                      <h1 className="text-sm text-gray-500">
                      Number you want to select?
                    </h1>
                    <div className='flex justify-between'>
                      <button
        className={`${
          selectedNumber === 1 ? 'bg-red-700' : 'bg-red-400'
        } hover:bg-red-700 px-4 p-2 rounded hover:scale-105 transition-transform ease-in-out delay-400 duration-400`}
        onClick={() => handleNumberSelection(1)}
      >
        1
      </button>
      <button
        className={`${
          selectedNumber === 3 ? 'bg-red-700' : 'bg-red-400'
        } hover:bg-red-700 px-4 p-2 rounded hover:scale-105 transition-transform ease-in-out delay-400 duration-400`}
        onClick={() => handleNumberSelection(3)}
      >
        3
      </button>
      <button
        className={`${
          selectedNumber === 5 ? 'bg-red-700' : 'bg-red-400'
        } hover:bg-red-700 px-4 p-2 rounded hover:scale-105 transition-transform ease-in-out delay-400 duration-400`}
        onClick={() => handleNumberSelection(5)}
      >
        5
      </button>
                      </div>
                    </div>
                    <div className='flex flex-col justify-between mt-4 gap-4'>
                      <h1 className="text-sm text-gray-500">
                      Money you want to bet?
                    </h1>
                     <div className="flex justify-between">
        <button
          className={`${
           betAmount === 100 ? 'bg-red-700' : 'bg-red-400'
          } hover:bg-red-700 px-4 p-2 rounded hover:scale-105 transition-transform ease-in-out delay-400 duration-400`}
          onClick={() => handleBetAmountSelection(100)}
        >
          100
        </button>
        <button
          className={`${
            betAmount === 500 ? 'bg-red-700' : 'bg-red-400'
          } hover:bg-red-700 px-4 p-2 rounded hover:scale-105 transition-transform ease-in-out delay-400 duration-400`}
          onClick={() => handleBetAmountSelection(500)}
        >
          500
        </button>
        <button
          className={`${
            betAmount === 1000 ? 'bg-red-700' : 'bg-red-400'
          } hover:bg-red-700 px-4 p-2 rounded hover:scale-105 transition-transform ease-in-out delay-400 duration-400`}
          onClick={() => handleBetAmountSelection(1000)}
        >
          1000
        </button>
      </div>
      <div className="flex justify-between">
        <button onClick={handleDecrement}>-</button>
        <p>{betAmount}</p>
        <button onClick={handleIncrement}>+</button>
      </div>
                      
                    </div>
                   

              
                  </div>

                  <div className="mt-4 flex justify-between items-center">
         <h1>Potential Win: {calculatePotentialWin()}</h1>

  
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                     
                   >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>):(<Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   Please Login to place Bet!
                  </Dialog.Title>
                 

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>)}
      </Transition>
    </>
  )
}
