import Navbar from '@/components/Navbar';
import Image from "next/image"
import Link from "next/link"

// SVG icon components for LinkedIn, X, Warpcast, Website, and GitHub
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
)
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
)
const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20a15.3 15.3 0 0 1 0-20z" /></svg>
)
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
)

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Fernando Castillo",
      role: "CTO",
      bio: "Fernando Castillo is a founder, blockchain specialist, and PhD candidate with 4 years of experience developing decentralized and scalable solutions. Currently, he combines his role as a researcher with a focus on security and efficiency in Web3 projects, bringing strategic vision and technical skills to drive innovation in the blockchain sector.",
      image: "/images/fernando_pic.webp",
      linkedin: "https://linkedin.com/in/fscastil90120/",
      website: "https://dobprotocol.com/fernando-castillo",
      x: "https://x.com/fscastil"
    },
    {
      name: "Simón Espinola",
      role: "CCO",
      bio: "Simón is a Commercial Engineer with over 10 years of experience leading business development and commercial strategy across Latin America.",
      image: "/images/foto_simon.webp",
      linkedin: "https://www.linkedin.com/in/simon-espinola-marin-06a78b86/",
      website: "https://dobprotocol.com/simon-espinola",
      x: "https://x.com/Cryptosadhu1"
    },
    {
      name: "Oscar Castillo",
      role: "CEO",
      bio: "With over 10 years of experience in AI, blockchain, and scalable software development, Oscar has successfully led multiple projects, including Forcast.tech, which now operates autonomously under his frameworks.",
      image: "/images/Oscar_pic.webp",
      linkedin: "https://linkedin.com/in/opcastil",
      website: "https://dobprotocol.com/oscar-castillo",
      x: "https://x.com/opcastil"
    },
    {
      name: "Andrés Peña Mellado",
      role: "CMO",
      bio: "With a background as a Web3 Journalist from the University of Santiago de Chile, Andres serves as Head of Marketing & Digital Strategy at Dobprotocol. Bringing expertise in digital marketing, blockchain, and strategic brand growth, Andres focuses on driving engagement and adoption within the Web3 ecosystem.",
      image: "/images/Foto_Andres.webp",
      linkedin: "https://www.linkedin.com/in/andresanemic/",
      website: "https://dobprotocol.com/andres-pena",
      x: "https://x.com/andresanemic"
    },
    {
      name: "Dani Dahm",
      role: "Head of UX and Visual Design",
      bio: "With a robust background in Visual Arts, Dani specializes in UI design, UX research, and comprehensive graphic design. At Dobprotocol, Dani leads interface design, conducts user testing, and creates graphic materials, including custom icons, illustrations, banners, and the project logo.",
      image: "/images/dani_dahm.webp",
      linkedin: "https://linkedin.com/in/dahm",
      website: "https://dobprotocol.com/dani-dahm",
      x: "https://x.com/dahm"
    },
    {
      name: "Joaquín Farfan",
      role: "Front End Engineer",
      bio: "Joaquín is a Full Stack Software Developer with over 6 years of experience building and scaling digital platforms across fintech, logistics, and decentralized systems.",
      image: "/images/foto_Joaquin.webp",
      linkedin: "https://linkedin.com/in/arfan/",
      github: "https://github.com/blessedux",
      x: "https://x.com/blessed_ux"
    },
    {
      name: "Cristobal Oyarzun",
      role: "Public Relations",
      bio: "With extensive expertise in Web3 advisory, content creation, personal branding, and entrepreneurship, Cristobal has founded and led tech startups in IT, blockchain, and Web3, also developing digital marketing businesses building innovative solutions from the ground up.",
      image: "/images/foto_Cris.webp",
      linkedin: "https://www.linkedin.com/in/cristobal-oyarzun-astete-holdordie/",
      website: "https://dobprotocol.com/cristobal-oyarzun",
      x: "https://x.com/vivedetuarteNFT"
    },
    {
      name: "Rubén Román",
      role: "Full Stack Engineer",
      bio: "Computer and Informatics Civil Engineer, with 3+ years experience working on Web3 projects, building new ones and maintaining existing ones, passionate on coding what makes him always be studying on personal projects.",
      image: "/images/ruben_picture.webp",
      linkedin: "https://linkedin.com/in/rubenromanvilasau",
      github: "https://github.com/rubenromanvilasau",
      x: "https://x.com/rubnacio"
    }
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8 mt-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
            Dobprotocol Team
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the passionate experts behind Dobprotocol. Our team combines deep expertise in blockchain technology, finance, and business development to create innovative solutions for the future of decentralized finance and real-world asset tokenization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-[#587CE9] transition-colors flex flex-col h-full shadow-sm hover:shadow-md">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative w-24 h-24 overflow-hidden rounded-full mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-[#587CE9]">{member.role}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 flex-grow">{member.bio}</p>
                <div className="flex gap-3 justify-center mt-auto pt-4">
                  {member.website ? (
                    <Link href={member.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-gray-600 hover:text-[#587CE9] dark:text-gray-400 dark:hover:text-[#587CE9] transition-colors">
                      <WebsiteIcon />
                    </Link>
                  ) : member.github ? (
                    <Link href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-600 hover:text-[#587CE9] dark:text-gray-400 dark:hover:text-[#587CE9] transition-colors">
                      <GitHubIcon />
                    </Link>
                  ) : null}
                  {member.linkedin && (
                    <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-[#587CE9] dark:text-gray-400 dark:hover:text-[#587CE9] transition-colors">
                      <LinkedInIcon />
                    </Link>
                  )}
                  {member.x && (
                    <Link href={member.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-gray-600 hover:text-[#587CE9] dark:text-gray-400 dark:hover:text-[#587CE9] transition-colors">
                      <XIcon />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 