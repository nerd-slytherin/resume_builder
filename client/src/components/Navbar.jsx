import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ get user from redux
  const user = useSelector((state) => state.auth.user);

  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          {/* ✅ show name only if user exists */}
          {user && (
            <p className="text-sm text-gray-700 max-sm:hidden">
              Hi, <span className="font-medium">{user.name}</span>
            </p>
          )}

          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
