"use client";

import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import serverUrl from "../../utils/serverUrl";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSendOtp = async () => {
    if (!email) {
      setErr("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(res.data);
      setErr("");
      setStep(2);
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setErr("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(res.data);
      setErr("");
      setStep(3);
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(res.data);
      setErr("");
      router.push("/login");
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            onClick={() => router.push("/signin")}
            className="text-[#ff4d2d] cursor-pointer"
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* STEP 1 - Enter Email */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 text-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full cursor-pointer font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white flex items-center justify-center gap-2"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
            </button>

            {err && <p className="text-red-500 font-semibold text-center mt-3">*{err}</p>}
          </div>
        )}

        {/* STEP 2 - Verify OTP */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <label htmlFor="otp" className="block font-medium mb-1">
                OTP
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 text-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full cursor-pointer font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white flex items-center justify-center gap-2"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Verify OTP"}
            </button>

            {err && <p className="text-red-500 font-semibold text-center mt-3">*{err}</p>}
          </div>
        )}

        {/* STEP 3 - Reset Password */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <label className="block font-medium mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-200 text-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer right-3 top-[14px] text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPasswords ? "text" : "password"}
                  className="w-full border border-gray-200 text-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="Enter Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer right-3 top-[14px] text-gray-500"
                  onClick={() => setShowPasswords((prev) => !prev)}
                >
                  {showPasswords ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full font-semibold rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white flex items-center justify-center gap-2"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Reset Password"}
            </button>

            {err && <p className="text-red-500 font-semibold text-center mt-3">*{err}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
