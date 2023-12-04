import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { publicRequest } from '../helpers/axios';
import toast from 'react-hot-toast'
export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false)
    const [showModal, setShowModal] = useState(false);
  const [credentials,setCredentials]=useState({
    username:'',
    name:'',
    email:'',
    phone:'',
countryCode: "1",
    password: '',  
    password_confirmation:'',
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


  const submitHandler=async(e)=>{
    e.preventDefault()
    try{
      await publicRequest.post('/auth/register',credentials)
      toast.success("Registration completed successfully")
      
    }catch(err){
const inputerror = err.response.data.errors;
			const error = err.response.data.message;
			toast.error(error);
		setErrors(inputerror);
    }
  }
  return (
    <>
    <div >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r transition-transform ease-in-out delay-150 duration-200 hover:scale-110 from-orange-500 via-orange-600 to-orange-600 text-white p-3 rounded-lg font-bold hover:from-orange-600 hover:to-orange-500"        >
          Register
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

          <h2 className="text-2xl font-bold mb-4 text-center">Registration Form</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
             <div className="mb-4">
              <label htmlFor="name" className="font-bold text-gray-700 text-lg">
                Username
              </label>
              <input
                onChange={inputChangeHandler}
                type="text"
                id="name"
                name="username"
                value={credentials.username}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your Username"
              />
              {errors?.username&&<p className='text-red-500'>{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="font-bold text-gray-700 text-lg">
                Name
              </label>
              <input
                onChange={inputChangeHandler}
                type="text"
                value={credentials.name}
                id="name"
                name="name"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your name"
              />
                            {errors?.name&&<p className='text-red-500'>{errors.name}</p>}

            </div>
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
            <div className="mb-4 flex items-center">
              <label htmlFor="phoneNumber" className="font-bold text-gray-700 text-lg mr-2">
                Phone Number
              </label>
<select
  id="countryCode"
  value={credentials.countryCode}
  onChange={inputChangeHandler}
  name="countryCode"
  className="p-2 border rounded-lg w-1/3"
>
  <option value="1">+1</option>
  <option value="44">+44</option>
  <option value="91">+91</option>
</select>

              <input
                type="tel"
                onChange={inputChangeHandler}
                id="phoneNumber"
                name="phone"
                value={credentials.phone}
                className="w-2/3 p-2 border rounded-lg"
                placeholder="Enter your phone number"
              />
                                          {errors?.phone&&<p className='text-red-500'>{errors.phone}</p>}

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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="font-bold text-gray-700 text-lg">
                Confirm Password
              </label>
              <input
                type="password"
                onChange={inputChangeHandler}
                id="confirmPassword"
                value={credentials.password_confirmation}
                name="password_confirmation"
                className="w-full p-2 border rounded-lg"
                placeholder="Confirm your password"
              />
                                                                      {errors?.password&&<p className='text-red-500'>{errors.password}</p>}

            </div>
            <button
              type="submit"
            
              className="bg-orange-500 text-white p-3 rounded-lg w-full hover:bg-orange-600"
            >
              Register
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
