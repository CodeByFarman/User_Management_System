import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { isEmailValid, isPasswordStrong } from "../utils/validators";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    if (!isEmailValid(form.email)) {
      return toast.error("Invalid email format");
    }

    if (!isPasswordStrong(form.password)) {
      return toast.error(
        "Password must be 8+ chars, include a number and uppercase letter"
      );
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await api.post("/auth/signup", {
        fullName: form.fullName,
        email: form.email,
        password: form.password
      });

      toast.success("Signup successful. Please login");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100"
  >
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center">
        Create Account
      </h2>
      <p className="text-slate-500 text-center mt-2 text-sm md:text-base">
        Sign up to get started
      </p>
    </div>

    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>
        <input
          name="fullName"
          type="text"
          placeholder="John Doe"
          className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder:text-slate-400"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder:text-slate-400"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder:text-slate-400"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder:text-slate-400"
          onChange={handleChange}
        />
      </div>
    </div>

    <button
      disabled={loading}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 mt-6"
    >
      {loading ? "Creating account..." : "Create Account"}
    </button>

    <div className="mt-6 text-center">
      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
          Sign In
        </Link>
      </p>
    </div>
  </form>
</div>
  );
};

export default Signup;
