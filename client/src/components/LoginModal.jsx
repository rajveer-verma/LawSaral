import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import { auth, googleProvider } from "../firebase";


function LoginModal({ open, onClose }) {
  const [loggingIn, setLoggingIn] = useState(false);


  if (!open) {
    return null;
  }


  const handleGoogleLogin = async () => {
    if (loggingIn) {
      return;
    }

    setLoggingIn(true);

    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const user = result.user;

      toast.success(
        "Welcome " +
          (user.displayName || "User") +
          "!"
      );

      onClose();

    } catch (err) {
      console.error(
        "Firebase Login:",
        err
      );

      if (
        err.code ===
        "auth/popup-closed-by-user"
      ) {
        return;
      }

      if (
        err.code ===
        "auth/cancelled-popup-request"
      ) {
        return;
      }

      if (
        err.code ===
        "auth/popup-blocked"
      ) {
        toast.error(
          "Popup blocked. Please allow popups."
        );
        return;
      }

      toast.error(
        err.message ||
          "Login Failed"
      );

    } finally {
      setLoggingIn(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl w-full max-w-[420px] p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Login Required
        </h2>

        <p className="text-gray-500 text-center mt-3">
          Please login to continue using LawSaral AI.
        </p>


        <button
          onClick={handleGoogleLogin}
          disabled={loggingIn}
          className={
            loggingIn
              ? "mt-8 w-full border rounded-xl py-3 flex items-center justify-center gap-3 transition bg-gray-100 cursor-not-allowed"
              : "mt-8 w-full border rounded-xl py-3 flex items-center justify-center gap-3 transition hover:bg-gray-50"
          }
        >

          <FcGoogle size={25} />

          {loggingIn
            ? "Signing in..."
            : "Continue with Google"}

        </button>


        <button
          onClick={onClose}
          disabled={loggingIn}
          className="mt-4 w-full py-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}


export default LoginModal;
