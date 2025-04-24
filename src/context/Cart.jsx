import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Product_header from '../components/Product_header';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  
  // Calculate the total price of all items
  const total = cartItems.reduce((sum, item) => sum + item.productPrice, 0);
  
  // Calculate the 18% GST (tax)
  const gst = total * 0.18;

  // Calculate the total price including GST
  const totalWithGST = total + gst;

  const handleRemove = (id) => {
    // Calling removeFromCart to delete item from cart
    removeFromCart(id);
  };

  return (
    <>
      <Product_header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">My Cart</h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li key={index} className="py-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.productName}</h3>
                    <p className="text-sm text-gray-500 mt-1">Price: ₹{item.productPrice}</p>
                  </div>
                  <div className="text-xl font-semibold text-green-600">
                    ₹{item.productPrice}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-4 text-red-600 hover:text-red-800 transition"
                  >
                    <img width="24" height="24" src="https://img.icons8.com/color/48/delete-forever.png" alt="delete-forever"/>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-6">
              <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                <div>Total: ₹{total}</div>
                <div className="text-sm text-gray-500">GST (18%): ₹{gst.toFixed(2)}</div>
                <div className="text-lg font-semibold text-gray-800">Total with GST: ₹{totalWithGST.toFixed(2)}</div>
              </div>
              <button className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition duration-300 w-full sm:w-auto">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
