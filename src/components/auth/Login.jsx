"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import serverUrl from "../../utils/serverUrl";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  function validateLogin() {
    const e = {};
    if (!loginEmail) e.loginEmail = "Email is required";
    if (!loginPassword) e.loginPassword = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);

    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      // ✅ Store unified user data
      const userData = {
        name: res.data.user?.name || "",
        email: res.data.user?.email || loginEmail,
        token: res.data.token || "",
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setLoginEmail("");
      setLoginPassword("");
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPassword() {
    router.push('/forget-pass');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-sm w-full bg-white rounded-2xl mt-[3rem] shadow-lg border border-gray-200 p-6">
        <h1 className="font-bold italic text-3xl text-center text-red-500 mb-6">
          Zomato
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-300"
              placeholder="you@example.com"
            />
            {errors.loginEmail && (
              <p className="text-xs text-red-500 mt-1">{errors.loginEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-300"
              placeholder="••••••••"
            />
            {errors.loginPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.loginPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-4 items-center">
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-red-500 cursor-pointer transition duration-200 hover:bg-red-600 text-white font-medium disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-red-400 cursor-pointer hover:text-red-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-red-400 hover:text-red-600 hover:underline">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
