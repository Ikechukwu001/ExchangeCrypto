"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Mail, Lock, User, CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react"
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

  // ✅ Live email validation
  useEffect(() => {
    if (email === "") return setEmailValid(null);
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // ✅ Password strength logic
  useEffect(() => {
    if (password.length === 0) return setPasswordStrength("");

    const strengthChecks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
    ];

    const passed = strengthChecks.filter(Boolean).length;

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
    <section className="w-full py-16 px-6 flex justify-center">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white"
          >
            {/* Toggle */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setIsSignUp(false)}
                className={`px-4 py-2 font-semibold transition-all ${
                  !isSignUp ? "text-amber-400 border-b-2 border-amber-400" : "text-white hover:text-amber-300"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`px-4 py-2 font-semibold transition-all ${
                  isSignUp ? "text-amber-400 border-b-2 border-amber-400" : "text-white hover:text-amber-300"
                }`}
              >
                Sign Up
              </button>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              key={isSignUp ? "signup" : "signin"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-white" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border ${
                    emailValid === null
                      ? "border-white/20"
                      : emailValid
                      ? "border-green-400"
                      : "border-red-400"
                  } text-white placeholder:text-white focus:outline-none focus:ring-2 ${
                    emailValid ? "focus:ring-green-400" : "focus:ring-red-400"
                  }`}
                />
                {email && (
                  <p
                    className={`text-sm mt-1 ${
                      emailValid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {emailValid ? "Valid email ✅" : "Invalid email format ❌"}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-white" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border ${
                    passwordStrength === "strong"
                      ? "border-green-400"
                      : passwordStrength === "medium"
                      ? "border-yellow-400"
                      : passwordStrength === "weak" && password
                      ? "border-red-400"
                      : "border-white/20"
                  } text-white placeholder:text-white focus:outline-none focus:ring-2 ${
                    passwordStrength === "strong"
                      ? "focus:ring-green-400"
                      : passwordStrength === "medium"
                      ? "focus:ring-yellow-400"
                      : "focus:ring-red-400"
                  }`}
                />
              </div>

              {/* Password requirements */}
              {isSignUp && password && (
                <div className="text-xs space-y-1 mt-1">
                  <p className={/[A-Z]/.test(password) ? "text-green-400" : "text-red-400"}>
                    {/[A-Z]/.test(password) ? <CheckCircle /> : <XCircle />} At least one uppercase letter
                  </p>
                  <p className={/[a-z]/.test(password) ? "text-green-400" : "text-red-400"}>
                    {/[a-z]/.test(password) ? <CheckCircle /> : <XCircle />} At least one lowercase letter
                  </p>
                  <p className={/\d/.test(password) ? "text-green-400" : "text-red-400"}>
                    {/\d/.test(password) ? <CheckCircle /> : <XCircle />} At least one number
                  </p>
                  <p className={/[@$!%*?&]/.test(password) ? "text-green-400" : "text-red-400"}>
                    {/[@$!%*?&]/.test(password) ? <CheckCircle /> : <XCircle />} One special character
                  </p>
                  <p className={password.length >= 8 ? "text-green-400" : "text-red-400"}>
                    {password.length >= 8 ? <CheckCircle /> : <XCircle /> } Minimum 8 characters
                  </p>
                </div>
              )}

              {/* Confirm password */}
              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white" size={18} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border ${
                      confirmPassword && confirmPassword !== password
                        ? "border-red-400"
                        : confirmPassword
                        ? "border-green-400"
                        : "border-white/20"
                    } text-white placeholder:text-white focus:outline-none`}
                  />
                </div>
              )}

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-amber-500 hover:from-blue-800 hover:to-amber-600 text-white py-3 rounded-xl font-semibold transition-all shadow-md"
              >
                {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full h-px bg-white/20" />
                <span className="px-2 text-white text-sm">or</span>
                <div className="w-full h-px bg-white/20" />
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-white/30 text-black hover:bg-white/10 py-3 rounded-xl transition-all"
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-700 to-amber-500 text-white rounded-3xl p-10 w-full max-w-md shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="mb-4"
            >
              <CheckCircle className="h-16 w-16 text-white drop-shadow-lg" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">{isSignUp ? "Account Created!" : "Welcome Back!"}</h2>
            <p className="text-blue-100 text-sm">Redirecting you to your dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
