import RedModal from './modals/RedModal'
import GreenModal from './modals/GreenModal'
import BlueModal from './modals/BlueModal'
const ColorBet = () => {
 return (
    <div className='p-16'>
        <h1 className='bg-gradient-to-r from-violet-700 via-purple-800 to-cyan-700 bg-clip-text text-transparent text-4xl'>Which Color you want to choose?</h1>
        <div className='flex flex-wrap gap-6 justify-between mt-12'>
           <button><RedModal /></button>
        <button ><GreenModal /></button>
            <button><BlueModal /></button>
        </div>
    </div>
  )
}

export default ColorBet