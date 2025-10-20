import CryptoHeader from "@/Components/crypto-header"
import Hero from "@/Components/hero"
import AuthSection from "@/Components/AuthSection"
import FeaturesSection from "@/Components/FeaturesSection"

export default function Home() {
  return (
    <div className="min-h-screen">
      <CryptoHeader />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <FeaturesSection />
        <AuthSection />
      </main>
    </div>
  )
}
