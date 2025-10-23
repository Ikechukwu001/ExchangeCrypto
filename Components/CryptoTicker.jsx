"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CryptoTicker() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,cardano,ripple,dogecoin,litecoin,sui&vs_currencies=usd&include_24hr_change=true"
        );
        const json = await res.json();

        const formatted = [
          {
            symbol: "BTC/USD",
            price: json.bitcoin.usd.toLocaleString(),
            change: `${json.bitcoin.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "ETH/USD",
            price: json.ethereum.usd.toLocaleString(),
            change: `${json.ethereum.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "BNB/USD",
            price: json.binancecoin.usd.toLocaleString(),
            change: `${json.binancecoin.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "SOL/USD",
            price: json.solana.usd.toLocaleString(),
            change: `${json.solana.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "ADA/USD",
            price: json.cardano.usd.toLocaleString(),
            change: `${json.cardano.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "XRP/USD",
            price: json.ripple.usd.toLocaleString(),
            change: `${json.ripple.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "DOGE/USD",
            price: json.dogecoin.usd.toLocaleString(),
            change: `${json.dogecoin.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "LTC/USD",
            price: json.litecoin.usd.toLocaleString(),
            change: `${json.litecoin.usd_24h_change.toFixed(2)}%`,
          },
          {
            symbol: "SUI/USD",
            price: json.sui.usd.toLocaleString(),
            change: `${json.sui.usd_24h_change.toFixed(2)}%`,
          },
        ];

        setData(formatted);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 1000); // Refresh every 1s
    return () => clearInterval(interval);
  }, []);

  if (data.length === 0) {
    return (
      <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-3 text-center">
        Loading crypto prices...
      </div>
    );
  }

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
                parseFloat(coin.change) >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {parseFloat(coin.change) >= 0 ? "+" : ""}
              {coin.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
