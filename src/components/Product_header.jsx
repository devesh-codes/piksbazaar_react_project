import React, { useContext } from 'react';
import { ChevronDown, Search, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Product_header = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="flex items-center justify-between sticky px-6 py-3 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <Link to={"/"}><img src="../assets/icon101.png" style={{ width: "180px" }} alt="" /></Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[50%]">
        <Search className="text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search vectors"
          className="bg-transparent outline-none px-2 w-full text-sm"
        />
        <div className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer">
          Photos <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Right Links */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        <Link to={"/login"}> <div className="cursor-pointer flex items-center gap-1">Login</div></Link>

       <Link to={"/cart"}> <button className="relative px-6 gap-2 flex py-2 border border-gray-300 rounded-full hover:bg-gray-100">
          <img width="18" height="18" src="https://img.icons8.com/pastel-glyph/64/shopping-cart--v1.png" alt="shopping-cart--v1" />
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button></Link>

        <button className="flex items-center gap-1 bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600">
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>
    </nav>
  );
};

export default Product_header;
