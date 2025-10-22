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

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <Hero />

        {/* Scrolling Crypto Prices */}
        <CryptoTicker />

        {/* Features */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-blue-100 p-8">
          <FeaturesSection />
        </section>

        {/* Authentication Section */}
        <section className="bg-gradient-to-r from-blue-700 to-white text-black rounded-3xl shadow-lg p-8">
          <AuthSection />
        </section>
      </main>
    </div>
  )
}
