"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";

export default function CryptoHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Fast<span className="text-amber-500">Exchange</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-amber-500 transition-colors">Features</Link>
          <Link href="/dashboard" className="hover:text-amber-500 transition-colors">About</Link>
          <Link href="/dashboard" className="hover:text-amber-500 transition-colors">Contact</Link>
        </nav>

        {/* CTA (Desktop) */}
        <div className="hidden md:block">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center text-gray-800"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Backdrop Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Mobile Menu (Slide-in Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 sm:w-1/2 bg-white shadow-2xl border-r border-gray-100 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end mb-6 text-gray-600 hover:text-amber-500 transition"
          >
            <X size={26} />
          </button>

          {/* Menu Links */}
          <nav className="flex flex-col space-y-6 text-lg font-medium text-gray-800">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-amber-500 transition">Home</Link>
            <Link href="/features" onClick={() => setMenuOpen(false)} className="hover:text-amber-500 transition">Features</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-amber-500 transition">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-amber-500 transition">Contact</Link>
          </nav>

          {/* CTA */}
          <div className="mt-auto">
            <Button
              onClick={() => setMenuOpen(false)}
              className="bg-amber-500 hover:bg-amber-600 text-white w-full font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
