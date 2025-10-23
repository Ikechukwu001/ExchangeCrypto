import CryptoHeader from "@/Components/crypto-header"
import Hero from "@/Components/hero"
import AuthSection from "@/Components/AuthSection"
import FeaturesSection from "@/Components/FeaturesSection"
import CryptoTicker from "@/Components/CryptoTicker"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-amber-50 text-gray-900">
      {/* Header */}
      <CryptoHeader />

      <main className="container mx-auto space-y-16">
        {/* Hero Section */}
        <Hero />

        {/* Scrolling Crypto Prices */}
        <CryptoTicker />

        {/* Features Section */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-blue-100 p-8">
          <FeaturesSection />
        </section>

        {/* Authentication Section */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl">
          {/* Gradient background with a professional overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-amber-500 opacity-95" />

          {/* Optional subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.15),transparent_60%)]" />

          {/* Auth content */}
          <div className="relative p-10 text-white text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Join <span className="text-amber-400">Fastxchange</span> Today
            </h2>
            <p className="max-w-2xl mx-auto text-white">
              Sign up to experience fast, secure, and borderless crypto exchange.  
              Your gateway to digital finance starts here.
            </p>

            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <AuthSection />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
