import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";



const Navbar = () => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    fetch("https://api.piksbazaar.com/publisher/api/v1/category/getCategory")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.category)) {
          setCategory(data.category);
        } else {
          setCategory([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setCategory([]);
      });
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('../assets/hero1.jpg')",
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 text-black relative">
        <div className="text-2xl font-bold">
          <Link to={"/"}>
            <img src="../assets/icon101.png" style={{ width: "230px" }} alt="logo" />
          </Link>
        </div>

        <ul className="flex items-center space-x-6">
          {!user ? (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-800 font-semibold">
                  Login
                </Link>
              </li>
              <li className="border pt-2 pb-2 pl-8 pr-8 w-20 flex justify-center border-gray-800 rounded-3xl">
                <Link to="/register" className="hover:text-gray-800">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="relative group">
              <div className=" cursor-pointer border rounded-full w-10  flex justify-center border-gray-800 p-1">
              <CgProfile style={{fontSize:"30px"}}/>
              
              </div>
              {/* Dropdown */}
              <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-3 hidden group-hover:block w-40 z-50">
                <p className="text-sm font-semibold">hey 👋🏻 {user.name}</p>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer hover:underline text-sm"
                >
                  Logout
                </button>
              </div>
            </li>
          )}

          <li>
          <Link to={"/contributor"}><button className="bg-gradient-to-r cursor-pointer from-green-400  to-emerald-600 hover:from-green-500 hover:to-emerald-700 px-6 py-2 rounded-full text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                     Become a Contributor
                </button></Link>

          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-[80vh] text-white bg-opacity40 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stunning Free Images & Videos
        </h1>
        <p className="text-lg mb-6">
          Over 2.5 million+ high quality stock images shared by our talented community.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl bg-white rounded-full flex overflow-hidden shadow-md">
          <select className="px-4 py-3 text-gray-700 outline-none bg-white rounded-l-full">
            <option value="">All Categories</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search Images, Vectors and more..."
            className="flex-1 px-4 py-3 text-gray-700 outline-none"
          />

          <button className="bg-[green] hover:bg-blue-700 text-white px-6 py-3 rounded-r-full">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
