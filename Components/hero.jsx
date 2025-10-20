"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Button } from "@/Components/ui/button";
import cryptoWalletAnimation from "@/public/animations/CryptoWallet.json"; // adjust path if different

export default function Hero() {
  return (
    <section className="w-full text-gray-900 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto py-20 px-6 overflow-hidden">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-6 mt-10 md:mt-0"
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-extrabold leading-tight text-blue-700"
        >
          Exchange <span className="text-orange-500">Crypto</span> Fast,
          <br /> Securely & Globally.
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-600 max-w-md"
        >
          Join thousands who trust{" "}
          <span className="font-semibold text-blue-700">FastExchange</span> to buy,
          sell, and swap their favorite cryptocurrencies instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4"
        >
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-transform hover:scale-105">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-6 py-3 rounded-full font-semibold shadow-sm transition-transform hover:scale-105"
          >
            View Rates
          </Button>
        </motion.div>
      </motion.div>

      {/* Lottie Animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex-1 flex justify-center"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-72 md:w-96"
        >
          <Lottie animationData={cryptoWalletAnimation} loop={true} />
        </motion.div>
      </motion.div>
    </section>
  );
}
