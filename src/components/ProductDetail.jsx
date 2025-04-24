import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Product_header from './Product_header';
import { ShoppingCart, Download } from 'lucide-react';
import Footer from './Footer';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const baseImageUrl = "https://api.piksbazaar.com/";

  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.piksbazaar.com/publisher/api/v1/product/getProducts");
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        const selectedProduct = data.find(p => p._id === id);

        if (selectedProduct) {
          setProduct(selectedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, [id]);

  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-10 text-center">Loading...</div>;

  const imageUrl = product.productResource1 ? `${baseImageUrl}${product.productResource1}` : '/api/placeholder/600/400';

  return (
    <>
      <Product_header />
      <div className="p-10 min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left - Image */}
          <div className="relative md:w-1/2">
            <img
              src={imageUrl}
              alt={product.productName}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-8xl font-bold text-gray-300 opacity-30 rotate-[-30deg] select-none">
                PIKSBAZAAR
              </p>
            </div>
          </div>

          {/* Right - Info */}
          <div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col  justify-center bg-gray-50">
          {/* <img  src="../assets/icon101.png" className='w-75 relative bottom-20' alt="" /> */}
          
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">{product.productName}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">{product.productDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Graphics</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">PSD</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">High-Res</span>
            </div>

            <div className="text-2xl font-semibold text-gray-800 mb-6">Price - ₹{product.productPrice}</div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex items-center cursor-pointer gap-2 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
