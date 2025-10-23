"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { LogOut, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Firebase Auth listener
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
      <div className="flex items-center justify-center h-screen text-white bg-gradient-to-b from-gray-900 to-black">
        <p className="text-2xl font-medium">Sign in to access your Dashboard...</p>
      </div>
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-center px-6 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white"
    >
      <div className="w-full max-w-md bg-gradient-to-b from-gray-800/60 to-gray-900/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm">Hello</p>
            <h1 className="text-lg font-semibold text-white">
              {user.displayName || user.email}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Available Balance */}
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm mb-1">Available Balance</p>
          <h2 className="text-4xl font-bold">$112,340.00</h2>
          <p className="text-green-400 text-sm mt-1">
            ↑ $10,240.00 (+12%)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full px-6 py-2 flex items-center gap-2">
            <ArrowUpRight size={16} /> Withdraw
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2">
            <ArrowDownLeft size={16} /> Deposit
          </Button>
        </div>

        {/* Portfolio Section */}
        <div className="bg-gray-800/60 rounded-2xl p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Portfolio</h3>
            <button className="text-amber-400 text-sm hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* BTC Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl border border-gray-600"
            >
              <p className="font-semibold text-white">BTC</p>
              <p className="text-sm text-gray-400">Bitcoin</p>
              <p className="mt-2 text-lg font-bold">$678.15</p>
              <p className="text-green-400 text-xs mt-1">+2.4%</p>
            </motion.div>

            {/* SUI Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl border border-gray-600"
            >
              <p className="font-semibold text-white">SUI</p>
              <p className="text-sm text-gray-400">Sui Coin</p>
              <p className="mt-2 text-lg font-bold">$1.12</p>
              <p className="text-red-400 text-xs mt-1">-0.6%</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
