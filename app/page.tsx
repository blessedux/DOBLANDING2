import Hero from "../components/Hero"
import Problem from "../components/Problem"
import Solution from "../components/Solution"
import HowItWorks from "../components/HowItWorks"
import Benefits from "@/components/Benefits"
import Partners from "@/components/Partners"
import CTA from "../components/CTA"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Benefits />
      <Partners />
      <CTA />
    </main>
  )
}

