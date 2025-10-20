import { Button } from "@/Components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CryptoHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Fast<span className="text-primary">xchange</span>
          </h1>
        </div>

        {/* Get Started Button */}
        <Button size="default" className=' bg-amber-400'>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}