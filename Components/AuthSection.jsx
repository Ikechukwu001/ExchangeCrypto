"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Mail, Lock, User, CheckCircle, XCircle } from "lucide-react";
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
  const [passwordStrength, setPasswordStrength] = useState("");
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    if (email === "") return setEmailValid(null);
    setEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    if (password.length === 0) return setPasswordStrength("");
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
    ];
    const passed = checks.filter(Boolean).length;
    if (passed <= 2) setPasswordStrength("weak");
    else if (passed === 3 || passed === 4) setPasswordStrength("medium");
    else setPasswordStrength("strong");
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (!emailRegex.test(email)) throw new Error("Invalid email format.");
      if (!passwordRegex.test(password))
        throw new Error("Weak password: include upper, lower, number & special char.");

      if (isSignUp) {
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
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
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      setError("Google sign-in failed: " + err.message);
    }
  };

  return (
    <section className="flex justify-center items-center py-14 px-4">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8"
          >
            {/* Toggle buttons */}
            <div className="flex justify-center mb-6 space-x-6">
              {["Sign In", "Sign Up"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setIsSignUp(i === 1)}
                  className={`text-base sm:text-lg font-semibold transition-all border-b-2 ${
                    (i === 1 && isSignUp) || (i === 0 && !isSignUp)
                      ? "text-amber-400 border-amber-400"
                      : "text-white border-transparent hover:text-amber-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <motion.form
              onSubmit={handleSubmit}
              key={isSignUp ? "signup" : "signin"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-3 text-white" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
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
                  className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/15 border ${
                    emailValid === null
                      ? "border-white/20"
                      : emailValid
                      ? "border-green-400"
                      : "border-red-400"
                  } text-white placeholder:text-white focus:outline-none focus:ring-2 ${
                    emailValid ? "focus:ring-green-400" : "focus:ring-red-400"
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
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              {error && <p className="text-red-300 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-amber-500 hover:from-blue-800 hover:to-amber-600 text-white py-3 rounded-xl font-semibold shadow-md"
              >
                {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>

              <div className="flex items-center justify-center my-4">
                <div className="w-full h-px bg-white/30" />
                <span className="px-2 text-white text-sm">or</span>
                <div className="w-full h-px bg-white/30" />
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-white/40 text-white hover:bg-white/10 py-3 rounded-xl"
              >
                <Image src="/GoogleIcon.jpeg" alt="Google" width={18} height={18} className="rounded-sm" />
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
            className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-700 to-amber-500 text-white rounded-2xl p-10 w-full max-w-md"
          >
            <CheckCircle className="h-16 w-16 text-white mb-4" />
            <h2 className="text-2xl font-bold mb-2">{isSignUp ? "Account Created!" : "Welcome Back!"}</h2>
            <p className="text-blue-100 text-sm">Redirecting to dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
