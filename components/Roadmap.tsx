'use client'

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence, type Variants } from "framer-motion"

// Data for each phase
const phases = [
  {
    id: 1,
    number: "01",
    title: "Foundation & Market Entry",
    subtitle: "Q1-Q3 2025",
    points: [
      "Community & Visibility: Grow to 3,000+ active members",
      "Launch DOB Protocol platform with profit pools & collateralization",
      "Secure $3M in seed funding from strategic investors",
      "Deploy $5M in DePIN financing as proof of concept",
      "Launch DOB token with structured staking model",
      "Secure early DePIN manufacturer agreements",
      "Begin global roadshows in key regions"
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Scaling & Institutional Adoption",
    subtitle: "Q4 2025 - Q2 2026",
    points: [
      "Achieve $20M in financed DePIN assets",
      "Introduce multi-chain support and DeFi protocol integration",
      "Develop institutional DePIN investment offerings",
      "Engage traditional finance players and VCs",
      "Expand team to 20+ members across departments",
      "Begin groundwork for regulated financing instruments"
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Network Effects & $50M DePIN",
    subtitle: "Q3-Q4 2026",
    points: [
      "Increase global partnerships with power grids & solar networks",
      "Deploy DOBI AI agent for automated financing",
      "Formalize structured DePIN finance products",
      "Secure additional $15M+ in funding",
      "Expand into IoT, AI infrastructure, and edge computing"
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Industry Leadership & $100M",
    subtitle: "2027",
    points: [
      "Drive global DePIN financing frameworks",
      "Introduce fully autonomous DePIN financing agents",
      "Scale TVL to $100M+, ensuring deep liquidity",
      "Enable fractionalized DePIN investments",
      "Achieve licensing in key regions"
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Institutional Capital & Mass Adoption",
    subtitle: "Q1-Q2 2028",
    points: [
      "Establish DePIN ETFs & structured products",
      "Achieve $500M TVL through institutional adoption",
      "Expand into smart cities and AI economies",
      "Introduce self-executing, AI-driven lending",
      "Position as leading DePIN finance ecosystem"
    ],
  },
]

// Animation variants
const tileVariants: Variants = {
  hidden: (i: number) => ({
    rotate: 90,
    opacity: 0,
    y: 50,
  }),
  visible: (i: number) => ({
    rotate: 45,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: i * 0.1,
    },
  }),
}

// Content animation variants
const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState(1)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const controls = useAnimation()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const getScaling = () => {
    return isMobile ? "scale(1)" : "scale(1.33)"
  }

  const getMarginLeft = () => {
    return isMobile ? "-75px" : "-100px"
  }

  const getTopOffset = (index: number) => {
    const baseOffset = 40
    const spacing = 60
    const scaleFactor = isMobile ? 1 : 1.25
    return baseOffset + index * (spacing * scaleFactor)
  }

  return (
    <section className="w-full py-20 bg-background relative">
      {/* Add a subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our Roadmap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our journey as we revolutionize decentralized options trading
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-center gap-12 md:gap-24">
          <motion.div
            className="relative w-full max-w-sm h-[500px] flex items-center justify-center"
            initial="hidden"
            animate="visible"
            onViewportEnter={() => setIsInView(true)}
          >
            <div className="relative w-[280px] md:w-[350px] h-[400px] md:h-[500px]">
              {/* Static numbers positioned to the right */}
              {phases.map((phase, index) => (
                <motion.div
                  key={`number-${phase.id}`}
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    activePhase === phase.id 
                      ? "text-primary-400 font-medium text-3xl"
                      : "text-muted-foreground/50 font-light text-2xl"
                  }`}
                  style={{
                    right: "-40px",
                    top: getTopOffset(index) + 75,
                  }}
                  onClick={() => setActivePhase(phase.id)}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {phase.number}
                </motion.div>
              ))}

              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  className="absolute cursor-pointer"
                  custom={index}
                  variants={tileVariants}
                  initial="hidden"
                  animate={controls}
                  style={{
                    width: "150px",
                    height: "150px",
                    top: getTopOffset(index),
                    left: "50%",
                    marginLeft: getMarginLeft(),
                    zIndex: phases.length - index,
                    backdropFilter: "blur(10px)",
                    position: "absolute",
                  }}
                  onClick={() => setActivePhase(phase.id)}
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      duration: 0.8,
                    },
                  }}
                >
                  {/* Background with enhanced glow effect */}
                  <div
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      activePhase === phase.id
                        ? "shadow-[0_0_40px_rgba(89,124,233,0.4)]"
                        : ""
                    }`}
                    style={{
                      background:
                        activePhase === phase.id
                          ? "linear-gradient(135deg, rgba(89,124,233,0.95), rgba(89,124,233,0.8))"
                          : "linear-gradient(135deg, rgba(89,124,233,0.4), rgba(89,124,233,0.2))",
                      border: activePhase === phase.id
                        ? "1px solid rgba(255,255,255,0.5)"
                        : "1px solid rgba(255,255,255,0.1)",
                      transition: "all 0.5s ease",
                      transform: getScaling(),
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="w-full max-w-md relative h-[500px] flex items-center">
            <AnimatePresence mode="wait">
              {phases.map(
                (phase) =>
                  activePhase === phase.id && (
                    <motion.div
                      key={phase.id}
                      className="absolute w-full"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <h2 className="text-primary-500 text-2xl font-medium">{phase.title}</h2>
                          <p className="text-muted-foreground text-sm">{phase.subtitle}</p>
                        </div>
                        <ul className="space-y-3">
                          {phase.points.map((point, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <span className="text-primary-500 mr-2 mt-1">•</span>
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Roadmap 