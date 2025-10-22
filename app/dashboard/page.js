"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Wallet, Bitcoin, LogOut } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Listen for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/"); // Redirect to home if not logged in
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-black text-4xl">Sign in / Sign Up to access Dashboard...</p>
      </div>
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-12 px-6"
    >
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="text-blue-700" />
            <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* User Info */}
        <div className="mb-8">
          <p className="text-gray-600 text-sm">Welcome back,</p>
          <h2 className="text-xl font-semibold text-blue-800">
            {user.displayName || user.email}
          </h2>
        </div>

        {/* Crypto Balance Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Bitcoin</span>
              <Bitcoin size={20} />
            </div>
            <h3 className="text-2xl font-bold">₿ 0.0054</h3>
            <p className="text-sm text-blue-200 mt-1">≈ $150.24</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Ethereum</span>
              <Bitcoin size={20} />
            </div>
            <h3 className="text-2xl font-bold">Ξ 0.072</h3>
            <p className="text-sm text-yellow-200 mt-1">≈ $125.70</p>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl">
            Deposit / Buy Crypto
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
