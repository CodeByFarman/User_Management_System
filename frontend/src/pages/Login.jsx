import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);

      login(res.data.token, res.data.user);
      toast.success("Login successful");

      navigate(
        res.data.user.role === "admin" ? "/admin" : "/profile"
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
        Welcome Back
      </h2>
      <p className="text-slate-500 text-center mt-2 text-sm md:text-base">
        Sign in to continue to your account
      </p>
    </div>

    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder:text-slate-400"
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
          className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder:text-slate-400"
          onChange={handleChange}
        />
      </div>
    </div>

    <button
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 mt-6"
    >
      {loading ? "Signing in..." : "Sign In"}
    </button>

    <div className="mt-6 text-center">
      <p className="text-sm text-slate-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
          Create Account
        </Link>
      </p>
    </div>
  </form>
</div>
  );
};

export default Login;
