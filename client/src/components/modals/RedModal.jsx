import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { privateRequest} from '../../helpers/axios';
import toast from 'react-hot-toast'
export default function RedModal() {

  const [isOpen, setIsOpen] = useState(false)

  const [betAmount, setBetAmount] = useState(100);
  const [selectedColor, setSelectedColor] = useState('red');
 
  


  const calculatePotentialWin = () => {
    let potentialWin = betAmount * 2; 

    if (selectedColor === 'red') 
    return potentialWin;
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
     await privateRequest.post('/bet', {
      color: selectedColor,
      betAmount: betAmount,
    });
      
   
    setIsOpen(false);

  

    toast.success('Bet placed Successfully!');
    customToast(betAmount, selectedColor, toast);

        await privateRequest.get('/bet'); 

  } catch (error) {
    console.error('Submission Error:', error);
    toast.error(error.message);
  }
};
function customToast(betAmount, selectedColor, toast) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1702673402~exp=1702674002~hmac=8f27ce8eab1527fd274e1a0e0ce6dc14e553d63d877fb945e405b14893ed11b9"
              alt=""
            />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-gray-900">
              Amount Placed: {betAmount}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Color: {selectedColor}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="border-l border-gray-200 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  ), { duration: 20000 }); 
}
  
  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
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
                    Select Amount
                  </Dialog.Title>
                  <div className="mt-6 flex flex-col gap-8">
                    <div className='flex flex-col justify-between mt-4 gap-4'>
                     <div className='flex flex-col gap-4 mt-4'>
  <label htmlFor='betAmount' className='text-sm text-gray-500'>
    Enter the amount you want to bet:
  </label>
  <input
    id='betAmount'
    type='number'
    className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
    value={betAmount}
    onChange={(e) => setBetAmount(Number(e.target.value))}
  />
</div>
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
