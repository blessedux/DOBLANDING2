import Hero from "../components/Hero"
import Problem from "../components/Problem"
import Solution from "../components/Solution"
import HowItWorks from "../components/HowItWorks"
import Benefits from "@/components/Benefits"
import Partners from "@/components/Partners"
import CTA from "../components/CTA"
import TrustedBy from "@/components/TrustedBy"
import LiquidityPool from "@/components/LiquidityPool"
import Roadmap from "@/components/Roadmap"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden m-0 p-0">
      <div className="h-screen m-0 p-0">
        <Hero />
      </div>
      <div>
        <Solution />
        <HowItWorks />
        <Benefits />
        <TrustedBy />
        <Partners />
        <Roadmap />
        <LiquidityPool />
        <CTA />
      </div>
    </main>
  )
}

