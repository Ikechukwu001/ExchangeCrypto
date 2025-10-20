// app/layout.js
import "./globals.css";
//import { Rajdhani } from "next/font/google";

export const metadata = {
  title: "FastExchange – Exchange Crypto Fast, Securely & Globally",
  description: "Buy, sell, and trade crypto instantly with FastExchange.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
