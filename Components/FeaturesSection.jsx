"use client";

import { motion } from "framer-motion";
import { Globe, Zap, ShieldCheck, Wallet } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 px-6 flex justify-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
      >
        <FeatureCard
          icon={<Globe className="text-blue-600" size={32} />}
          title="Global Access"
          text="Send and receive money anywhere in the world with ease."
          glow="from-blue-200/50"
        />
        <FeatureCard
          icon={<Zap className="text-yellow-500" size={32} />}
          title="Fast Transactions"
          text="Lightning-speed transfers that happen in seconds, not minutes."
          glow="from-yellow-200/50"
        />
        <FeatureCard
          icon={<ShieldCheck className="text-green-600" size={32} />}
          title="Bank-Level Security"
          text="Your data and funds are protected with top-tier encryption."
          glow="from-green-200/50"
        />
        <FeatureCard
          icon={<Wallet className="text-amber-600" size={32} />}
          title="Transparent Rates"
          text="No hidden fees — get real exchange rates updated live."
          glow="from-amber-200/50"
        />
      </motion.div>
    </section>
  );
}

// 🌟 FeatureCard Component
function FeatureCard({ icon, title, text, glow }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative flex flex-col items-center text-center bg-white shadow-md rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all"
    >
      {/* Glow effect behind icon */}
      <div
        className={`absolute top-8 w-20 h-20 bg-gradient-to-tr ${glow} blur-3xl opacity-60 rounded-full`}
      ></div>

      <div className="relative mb-4 z-10">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm mt-2">{text}</p>
    </motion.div>
  );
}
