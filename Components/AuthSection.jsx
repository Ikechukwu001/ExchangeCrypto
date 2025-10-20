"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // ✅ your firebase config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function AuthSection() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ Email/Password Authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        if (password !== confirmPassword)
          return setError("Passwords do not match.");

        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-amber-50 py-20 px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200"
      >
        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsSignUp(false)}
            className={`px-4 py-2 font-semibold transition-all ${
              !isSignUp
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`px-4 py-2 font-semibold transition-all ${
              isSignUp
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          key={isSignUp ? "signup" : "signin"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isSignUp && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </Button>

          <div className="relative flex items-center justify-center my-4">
            <div className="w-full h-px bg-gray-300" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <div className="w-full h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            <Image src="/GoogleIcon.jpeg" alt="Google" width={18} height={18} />
            Continue with Google
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
}
