import { Link, useNavigate } from 'react-router-dom';
import { FaStore, FaSignOutAlt, FaUserCog, FaBoxes } from 'react-icons/fa';

const VendorNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('vendorToken');

  const handleLogout = () => {
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendor');
    navigate('/vendor/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/vendor" className="flex items-center space-x-2">
          <FaStore className="text-xl" />
          <span className="font-bold text-xl">Vendor Dashboard</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/vendor/products" className="flex items-center hover:text-blue-300">
            <FaBoxes className="mr-2" /> Products
          </Link>
          <Link to="/vendor/orders" className="flex items-center hover:text-blue-300">
            <FaBoxes className="mr-2" /> Orders
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/vendor/profile" className="flex items-center hover:text-blue-300">
                <FaUserCog className="mr-2" /> Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center hover:text-red-300"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/vendor/login" className="hover:text-blue-300">Login</Link>
              <Link to="/vendor/register" className="hover:text-blue-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default VendorNavbar;