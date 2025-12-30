import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Profile = () => {
  const { user, login } = useAuth();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const updateProfile = async () => {
    try {
      const res = await api.put("/users/profile", {
        fullName,
        email
      });

      login(localStorage.getItem("token"), res.data);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Profile update failed");
    }
  };

  const changePassword = async () => {
    if (!password) return toast.error("Password required");

    try {
      await api.put("/users/password", { password });
      toast.success("Password changed successfully");
      setPassword("");
    } catch {
      toast.error("Password update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 py-8 md:p-8">
  <div className="max-w-2xl mx-auto">
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 md:px-8 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          My Profile
        </h2>
        <p className="text-blue-100 mt-1 text-sm md:text-base">
          Manage your account information
        </p>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Profile Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Profile Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={updateProfile}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
          >
            Save Profile
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200"></div>

        {/* Change Password Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Change Password
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder:text-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={changePassword}
            className="w-full mt-6 bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3.5 rounded-lg font-semibold hover:from-slate-800 hover:to-slate-950 transition-all duration-200 shadow-lg shadow-slate-500/30 hover:shadow-xl hover:shadow-slate-500/40"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Profile;
