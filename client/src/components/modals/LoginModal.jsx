import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { publicRequest } from '../helpers/axios';
import toast from 'react-hot-toast'
export default function LoginModal() {
  let [isOpen, setIsOpen] = useState(true)
    const [showModal, setShowModal] = useState(false);
  const [credentials,setCredentials]=useState({
  
    email:'',
 
    password: '',  
  
  })
  const[errors,setErrors]=useState('')

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

const inputChangeHandler = (e) => {
  const { name, value } = e.target;
  setCredentials((prevCredentials) => ({
    ...prevCredentials,
    [name]: name === 'countryCode' ? e.target.value : value,
  }));
  setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
};


 const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await publicRequest.post('/auth/login', credentials);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
    toast.success('Login successful');
  window.location.reload();
  } catch (err) {
    const inputerror = err.response.data.errors;
    const error = err.response.data.message;
    console.log(error);
    toast.error(error);
    setErrors(inputerror);
  }
};

  return (
    <>
    <div >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r transition-transform ease-in-out delay-150 duration-200 hover:scale-110 from-purple-500 via-violet-600 to-cyan-600 text-white p-3 rounded-lg font-bold hover:from-orange-600 hover:to-orange-500"        >
          Login
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/25" />

          <div className="min-h-full flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
             
                        <Dialog.Panel className="z-50 max-w-md p-6 text-left align-middle bg-white rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-4 text-center">Login Form</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            
           
            <div className="mb-4">
              <label htmlFor="email" className="font-bold text-gray-700 text-lg">
                Email
              </label>
              <input
              onChange={inputChangeHandler}
                type="email"
                id="email"
                value={credentials.email}
                name="email"
                className="w-full p-2 border rounded-lg"
               placeholder="Enter your email"
              />
                                          {errors?.email&&<p className='text-red-500'>{errors.email}</p>}

            </div>
           
            <div className="mb-4">
              <label htmlFor="password" className="font-bold text-gray-700 text-lg">
                Password
              </label>
              <input
                type="password"
                onChange={inputChangeHandler}
                id="password"
                value={credentials.password}
                name="password"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your password"
              />
                                                        {errors?.password&&<p className='text-red-500'>{errors.password}</p>}

            </div>
           
            <button
              type="submit"
            
              className="bg-orange-500 text-white p-3 rounded-lg w-full hover:bg-orange-600"
            >
             Login
            </button>
          </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
