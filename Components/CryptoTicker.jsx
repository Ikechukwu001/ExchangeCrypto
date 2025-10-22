"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Temporary static data (we'll make it dynamic later)
const defaultData = [
  { symbol: "BTC/USD", price: "67,842.15", change: "+2.4%" },
  { symbol: "ETH/USD", price: "3,254.30", change: "+1.9%" },
  { symbol: "BNB/USD", price: "592.60", change: "-0.5%" },
  { symbol: "SOL/USD", price: "162.45", change: "+3.2%" },
  { symbol: "ADA/USD", price: "0.457", change: "-1.1%" },
  { symbol: "XRP/USD", price: "0.622", change: "+0.8%" },
  { symbol: "DOGE/USD", price: "0.152", change: "+4.5%" },
  { symbol: "LTC/USD", price: "83.72", change: "-0.9%" },
];

export default function CryptoTicker() {
  const [data, setData] = useState(defaultData);

  // Later: useEffect(() => fetch live crypto data here)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small price changes for animation realism
      setData((prev) =>
        prev.map((coin) => {
          const rand = (Math.random() * 0.4 - 0.2).toFixed(2);
          const newPrice = (parseFloat(coin.price.replace(/,/g, "")) + parseFloat(rand)).toLocaleString();
          return { ...coin, price: newPrice };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-3 overflow-hidden border-t border-blue-700 shadow-inner">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {data.concat(data).map((coin, i) => (
          <div
            key={i}
            className="flex items-center gap-2 min-w-max px-4"
          >
            <span className="font-semibold">{coin.symbol}</span>
            <span className="text-amber-400 font-medium">${coin.price}</span>
            <span
              className={`text-sm ${
                coin.change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}
            >
              {coin.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
