import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white shadow-lg border-b border-slate-700">
  <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
    <div className="flex justify-between items-center">
      
      <div className="flex gap-4 md:gap-6 items-center">
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          User System
        </span>

        <div className="hidden md:flex gap-4 items-center">
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/profile"
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Profile
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden sm:block text-sm text-right">
          <p className="font-semibold text-white">{user.fullName}</p>
          <p className="text-slate-400 capitalize text-xs">{user.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 text-sm md:text-base"
        >
          Logout
        </button>
      </div>
    </div>


    <div className="md:hidden flex gap-4 mt-3 pt-3 border-t border-slate-700">
      {user.role === "admin" && (
        <Link
          to="/admin"
          className="text-slate-300 hover:text-white transition-colors duration-200 font-medium text-sm"
        >
          Dashboard
        </Link>
      )}

      <Link
        to="/profile"
        className="text-slate-300 hover:text-white transition-colors duration-200 font-medium text-sm"
      >
        Profile
      </Link>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
