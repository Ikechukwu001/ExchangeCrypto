"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Button } from "@/Components/ui/button";
import cryptoWalletAnimation from "@/public/animations/CryptoWallet.json";

export default function Hero() {
  return (
    <section className="relative w-full bg-white text-gray-900 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto py-24 px-6 md:px-10 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50 opacity-70 pointer-events-none" />

      {/* Left Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-6 mt-10 md:mt-0 relative z-10"
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight text-blue-900"
        >
          Exchange <span className="text-amber-500">Crypto</span> Fast,
          <br /> Securely & Globally.
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-600 max-w-md leading-relaxed"
        >
          Join thousands who trust{" "}
          <span className="font-semibold text-blue-900">FastExchange</span> to
          buy, sell, and swap their favorite cryptocurrencies instantly —
          anytime, anywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 pt-4"
        >
          <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-amber-200 transition-all hover:scale-105">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
          >
            View Rates
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Animation Section with glass effect */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex-1 flex justify-center relative z-10"
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-72 md:w-96 backdrop-blur-md bg-white/40 rounded-2xl shadow-lg shadow-blue-100 border border-white/20 p-4"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-amber-300/50 to-transparent rounded-full blur-3xl" />
          <Lottie animationData={cryptoWalletAnimation} loop={true} />
        </motion.div>
      </motion.div>
    </section>
  );
}
