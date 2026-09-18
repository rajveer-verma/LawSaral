import { Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import {
  FaBalanceScale,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

function Navbar() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout Error:", err);
      toast.error("Logout failed");
    }
  };

  const firstLetter =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
              <FaBalanceScale
                className="text-blue-600"
                size={21}
              />
            </div>

            <div className="leading-none">
              <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
                LawSaral
              </h1>
            </div>
          </Link>

          {/* Right Side */}
          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 rounded-lg font-semibold transition shadow-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-gray-50 transition"
              >
                {/* Profile */}
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {firstLetter}
                  </div>
                )}

                {/* User information */}
                <div className="hidden sm:block text-left max-w-[180px]">
                  <p className="font-semibold text-sm text-gray-800 truncate">
                    {user.displayName || "User"}
                  </p>

                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>

                <FaChevronDown
                  className={`text-gray-400 text-xs transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  
                  <div className="px-4 py-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 truncate">
                      {user.displayName || "User"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1 break-all">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition font-medium text-sm"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}

export default Navbar;