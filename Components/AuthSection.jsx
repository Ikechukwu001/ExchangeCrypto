"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Mail, Lock, User, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
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
  const [success, setSuccess] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (email === "") return setEmailValid(null);
    setEmailValid(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (!emailRegex.test(email)) throw new Error("Invalid email format.");

      if (isSignUp) {
        if (password !== confirmPassword)
          throw new Error("Passwords do not match.");
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      const msg =
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : err.code === "auth/user-not-found"
          ? "No account found with this email."
          : err.code === "auth/wrong-password"
          ? "Incorrect password. Try again."
          : err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setError("Google sign-in failed: " + err.message);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-2 px-2 overflow-hidden text-center">
      {/* Floating crypto icons background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          src="/crypto/btc.svg"
          alt="BTC"
          className="absolute w-14 opacity-10"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "15%" }}
        />
        <motion.img
          src="/crypto/eth.svg"
          alt="ETH"
          className="absolute w-12 opacity-10"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "50%", right: "10%" }}
        />
        <motion.img
          src="/crypto/usdt.svg"
          alt="USDT"
          className="absolute w-10 opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "15%", left: "30%" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md space-y-8 relative z-10"
          >
            {/* Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                {isSignUp ? "Create Your Account" : "Welcome Back"}
              </h2>
              <p className="text-blue-100 mt-2 text-sm md:text-base">
                {isSignUp
                  ? "Join the FastExchange community in seconds."
                  : "Sign in to continue trading safely."}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center gap-6">
              {["Sign In", "Sign Up"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setIsSignUp(i === 1)}
                  className={`text-lg font-semibold border-b-2 transition-all ${
                    (i === 1 && isSignUp) || (i === 0 && !isSignUp)
                      ? "text-amber-400 border-amber-400"
                      : "text-white border-transparent hover:text-amber-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              key={isSignUp ? "signup" : "signin"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-3 text-white" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-white" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/70 focus:outline-none ${
                    emailValid === null
                      ? "focus:ring-amber-400"
                      : emailValid
                      ? "ring-2 ring-green-400"
                      : "ring-2 ring-red-400"
                  }`}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-white" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Confirm Password */}
              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white" size={18} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              {error && <p className="text-red-300 text-sm">{error}</p>}

              {/* Buttons */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-amber-500 hover:from-blue-800 hover:to-amber-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>

              {/* Google */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-16 h-px bg-white/30" />
                <span className="text-white/70 text-sm">or</span>
                <div className="w-16 h-px bg-white/30" />
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-white/40 text-black hover:bg-white/10 py-3 rounded-xl"
              >
                <Image
                  src="/GoogleIcon.jpeg"
                  alt="Google"
                  width={18}
                  height={18}
                  className="rounded-sm"
                />
                Continue with Google
              </Button>
            </motion.form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center rounded-2xl p-10 w-full max-w-md text-white relative z-10"
          >
            <CheckCircle className="h-16 w-16 text-white mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              {isSignUp ? "Account Created!" : "Welcome Back!"}
            </h2>
            <p className="text-blue-100 text-sm">Redirecting to dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
