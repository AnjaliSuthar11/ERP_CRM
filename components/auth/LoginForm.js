"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", form);

      toast.success(res.data.message);

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
    >
      <h1 className="text-3xl font-bold mb-2">
        Welcome Back
      </h1>

      <p className="text-gray-500 mb-8">
        Login to your account
      </p>

      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={changeHandler}
          placeholder="Enter your email"
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={changeHandler}
          placeholder="Enter your password"
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}