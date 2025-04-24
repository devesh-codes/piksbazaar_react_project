import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for images - adjust this based on your actual base URL
  const baseImageUrl = "https://api.piksbazaar.com/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.piksbazaar.com/publisher/api/v1/product/getProducts");
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen  border-b-1 border-gray-200 pb-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Gallery</h2>

      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading gallery images...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">Error loading images: {error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No images found</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-x-1 ">
          {products.map((product) => {
            const imageUrl = product.productResource1 
              ? `${baseImageUrl}${product.productResource1}`
              : "/api/placeholder/400/320";
            
            return (
              <Link to={`/product/${product._id}`}>
  <div
    key={product._id}
    className="w-full   break-inside-avoid rounded-lg shadow-md overflow-hidden relative group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
  >
    <img
      src={imageUrl}
      alt={product.productName}
      className="w-full object-cover group-hover:blur-sm transition-all duration-300"
    />
    <div className="absolute inset-0 bg-[#29272775] bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
      <h2 className="text-white text-2xl text-center mb-4 px-3">{product.productName}</h2>
      <p className="text-white font-medium text-center mb-4 px-3">{product.productDescription}</p>
      <p className="text-white font-medium text-center mb-4 px-3">price - ₹{product.productPrice}</p>
      <button className="bg-white text-black py-1 px-4   rounded-full font-medium hover:bg-opacity-90 transition-all duration-200">
        Explore
      </button>
    </div>
  </div>
</Link>

            );
          })}
        </div>
      )}
    </div>
  );
};

export default Gallery;