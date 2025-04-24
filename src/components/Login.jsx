import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://api.piksbazaar.com/user/api/v1/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save token
      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      // Save user info
      localStorage.setItem("user", JSON.stringify({
        name: user?.name || "Dev",
        avatar: user?.avatar || "👤"
      }));

      toast.success("Login successful 🎉");
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="w-1/2 bg-[#2b3142] text-white flex flex-col justify-center items-center p-12">
        <img src="../assets/icon101.png" style={{ width: "250px" }} alt="logo" />
        <h2 className="text-2xl font-semibold mb-2">Welcome to Our Platform</h2>
        <p className="text-lg text-gray-300">Join us and manage your account seamlessly.</p>
      </div>

      {/* Right section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-1/2 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#2b3142] text-white rounded-full font-semibold hover:bg-[#1f2533] transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to={"/register"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
