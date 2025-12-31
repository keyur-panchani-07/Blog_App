"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import serverUrl from "../../utils/serverUrl";
import { useRouter } from "next/navigation";

export default function SignUps() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRadio, setRegRadio] = useState("");
  const [regCheckbox, setRegCheckbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  function validateRegister() {
    const e = {};
    if (!regName) e.regName = "Name is required";
    if (!regEmail) e.regEmail = "Email is required";
    if (!regPassword) e.regPassword = "Password is required";
    else if (regPassword.length < 6)
      e.regPassword = "Password must be at least 6 characters";
    if (!regRadio) e.regRadio = "Please select gender";
    if (!regCheckbox) e.regCheckbox = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!validateRegister()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/api/auth/register`, {
        name: regName,
        email: regEmail,
        password: regPassword,
        radio: regRadio,
        checkbox: regCheckbox,
      });
    //   alert(`Registration successful: ${res.data.message || regEmail}`);

      // ✅ Reset all fields after successful registration
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegRadio("");
      setRegCheckbox(false);
      setErrors({});

      router.push('/login');    
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-sm w-full bg-white rounded-2xl mt-[3rem] shadow-lg border border-gray-200 p-6">
        <h1 className="font-bold italic text-3xl text-center text-red-500 mb-6">
          Zomato
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-300"
              placeholder="Your full name"
            />
            {errors.regName && (
              <p className="text-xs text-red-500 mt-1">{errors.regName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-300"
              placeholder="you@example.com"
            />
            {errors.regEmail && (
              <p className="text-xs text-red-500 mt-1">{errors.regEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-300"
              placeholder="At least 6 characters"
            />
            {errors.regPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.regPassword}</p>
            )}
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={regRadio === "male"}
                onChange={(e) => setRegRadio(e.target.value)}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={regRadio === "female"}
                onChange={(e) => setRegRadio(e.target.value)}
              />
              Female
            </label>
          </div>
          {errors.regRadio && (
            <p className="text-xs text-red-500 mt-1">{errors.regRadio}</p>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={regCheckbox}
              onChange={(e) => setRegCheckbox(e.target.checked)}
            />
            <label>I agree to the terms</label>
          </div>
          {errors.regCheckbox && (
            <p className="text-xs text-red-500 mt-1">{errors.regCheckbox}</p>
          )}

          <div className="flex flex-col gap-4 items-center">
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-red-500 cursor-pointer transition duration-200 hover:bg-red-600 text-white font-medium disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <Link
              href="/login"
              className="text-sm text-red-400 hover:text-red-600 hover:underline"
            >
              Go to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
