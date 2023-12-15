import RedModal from './modals/RedModal'
import GreenModal from './modals/GreenModal'
import BlueModal from './modals/BlueModal'
const ColorBet = () => {
 return (
 <div className='p-4 md:p-20 flex flex-col'>
    <h1 className='bg-gradient-to-r from-violet-700 via-purple-800 to-cyan-700 bg-clip-text text-transparent text-2xl md:text-4xl text-center'>
        Which color do you want to choose?
    </h1>
    <div className='flex flex-wrap gap-4 md:gap-6 justify-center md:justify-between items-center mt-6 md:mt-12'>
        <div className='flex flex-col items-center'>
           <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform scale-100'>
                <RedModal />
           </button>
            <p className='mt-1 font-bold'>2x</p>
        </div>
        <div className='flex flex-col items-center'>
            <button className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform scale-100 hover:scale-200'>
                <GreenModal />
            </button>
            <p className='mt-1 font-bold'>2x</p>
        </div>
        <div className='flex flex-col items-center'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform scale-100 hover:scale-450'>
                <BlueModal />
            </button>
            <p className='mt-1 font-bold'>4.5x</p>
        </div>
    </div>
</div>


  )
}

export default ColorBet