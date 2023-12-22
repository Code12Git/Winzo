import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import SideDrawer from "../common/SideDrawer";



const user = JSON.parse(localStorage.getItem('user'));

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <div >
        <div className="flex flex-wrap justify-center gap-2 md:justify-between lg:justify-between items-center py-4 md:py-6">
          <div className="flex items-center space-x-3">
           <SideDrawer />
            <div className="flex items-center space-x-2">
              <img src="/logo.png" className="w-10" alt="colorBat" />
              <h1 className="text-lg lg:text-4xl font-bold font-serif">
                <span className="text-gradient bg-gradient-to-r from-sky-700 to-cyan-800 bg-clip-text text-transparent">Color</span>
                <span className="text-gradient lg:text-2xl bg-gradient-to-r from-violet-900 via-red-500 to-pink-400 bg-clip-text text-transparent">Bat</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center flex-wrap space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <p className='text-xl lg:text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-red-700 to-green-700'>
                  {user.name.split(' ')[0]}
                </p>
                <button type="button" onClick={handleLogout} className="text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-green-700">Logout</button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button type="button"><LoginModal /></button>
                <button type="button"><RegisterModal /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    )
}

export default Navbar;