import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [verified, setVerified] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.piksbazaar.com/user/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      await sendOTP(formData.email); // Send OTP after successful registration
      setStep(2);
    } catch (err) {
      setOtpError(err.message);
    }
  };

  const sendOTP = async (email) => {
    try {
      const res = await fetch("https://api.piksbazaar.com/user/api/v1/auth/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid JSON response from OTP API", err);
      }

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setOtpMessage("OTP sent successfully to your email.");
      setOtpError("");
    } catch (err) {
      setOtpMessage("");
      setOtpError(err.message);
    }
  };

  const handleVerifyOTP = async () => {
    setVerifyLoading(true);
    setVerifyError("");

    try {
      const res = await fetch("https://api.piksbazaar.com/user/api/v1/auth/verifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: otp.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      setVerified(true);
    } catch (err) {
      setVerifyError(err.message);
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side */}
      <div className="w-1/2 bg-[#1f2937] text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold text-blue-500 tracking-widest">PiKSBAZAAR</h1>
        <h2 className="text-2xl font-semibold mt-4">Welcome to Our Platform</h2>
        <p className="mt-2 text-center text-gray-300">
          Join us and manage your account seamlessly.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center p-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="signup"
              onSubmit={handleSignUp}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 text-center">Create Account</h2>

              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="input-modern"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@mail.com"
                  className="input-modern"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="input-modern"
                  required
                />
              </div>

              <button type="submit" className="btn-modern">
                Sign Up
              </button>

              {otpError && <p className="text-red-500 text-center text-sm">{otpError}</p>}

              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-600 hover:underline font-medium">Login</Link>
              </p>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div
              key="otp"
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {verified ? (
                <>
                  <h2 className="text-2xl font-bold text-green-600 text-center">Email Verified ✅</h2>
                  <p className="text-center text-gray-700">Your email has been successfully verified.</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 text-center">Verify OTP</h2>
                  <p className="text-sm text-gray-600 text-center">
                    We’ve sent a 6-digit code to <span className="font-medium">{formData.email}</span>.
                  </p>

                  {otpMessage && <p className="text-green-600 text-center text-sm">{otpMessage}</p>}
                  {otpError && <p className="text-red-500 text-center text-sm">{otpError}</p>}
                  {verifyError && <p className="text-red-500 text-center text-sm">{verifyError}</p>}

                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-modern text-center tracking-widest text-lg font-mono"
                    placeholder="______"
                  />

                  <button
                    className="btn-modern"
                    onClick={handleVerifyOTP}
                    disabled={verifyLoading}
                  >
                    {verifyLoading ? "Verifying..." : "Verify"}
                  </button>

                  <p className="text-sm text-center text-gray-500">
                    Didn't get the code?{" "}
                    <button
                      onClick={() => sendOTP(formData.email)}
                      className="text-blue-600 hover:underline font-medium"
                      type="button"
                    >
                      Resend
                    </button>
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;
