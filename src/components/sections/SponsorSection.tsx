"use client"
import { FC, useState, useEffect } from "react"
import { Sponsor } from "@/types/sponsors.types"
import  useHomeData  from "@/hooks/useHomeData"
import Link from "next/link"
interface SponsorSectionProps {
 initialSponsors: Sponsor[]
}

const SponsorSection: FC<SponsorSectionProps> = ({ initialSponsors }) => {
  const { dataCreators, dataSponsors, loadingCreators, errorCreators } = useHomeData()
  const sponsors = Array.isArray(dataSponsors) && dataSponsors.length > 0 ? dataSponsors : initialSponsors

  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null)

  // Simular la animación de entrada
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Función para incrementar visitas (simulada)
  const handleSponsorClick = (sponsorId: string) => {
    console.log(`Sponsor clicked: ${sponsorId}`)
    // Aquí iría la lógica para incrementar el contador de clicks
  }

  if (loadingCreators) {
    return (
      <div className="flex justify-center items-center h-96 bg-black">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-800 rounded-md mb-4"></div>
          <div className="h-4 w-48 bg-gray-700 rounded-md mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (errorCreators) {
    return (
      <div className="flex justify-center items-center h-96 bg-black text-red-400">
        <div className="text-center p-8 bg-gray-900 rounded-lg border border-red-900 max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h2 className="text-xl font-bold mb-2">Error al cargar los sponsors</h2>
          <p className="text-gray-400">
            Lo sentimos, ha ocurrido un error al cargar los sponsors. Por favor, intenta de nuevo más tarde.
          </p>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-fixed"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-yellow-500/5 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Header with animated elements */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-400 mx-auto mb-2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 mb-4">
            Sponsors Afiliados
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-300 text-lg">
            Descubre contenido exclusivo y ofertas especiales de nuestros partners premium.
          </p>
        </div>

        {/* Sponsors grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id || index}
              className={`transform transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredSponsor(sponsor.id || index.toString())}
              onMouseLeave={() => setHoveredSponsor(null)}
            >
              <div className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-800">
                {/* Background image with parallax effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${sponsor.imgs[0] || "/placeholder.svg?height=600&width=800"})`,
                    transform: hoveredSponsor === (sponsor.id || index.toString()) ? "scale(1.05)" : "scale(1)",
                  }}
                ></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>

                {/* Glowing border effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-xl border border-yellow-400/30 shadow-[0_0_15px_rgba(253,224,71,0.3)]"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  {/* Top section with logo */}
                  <div className="flex justify-between items-start">
                   
                    <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>{sponsor.clickCounts? sponsor.clickCounts.toLocaleString(): 10}</span>
                    </div>
                  </div>

                  {/* Bottom section with info */}
                  <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors duration-300">
                      {sponsor.name}
                    </h3>
                    <p className="text-gray-300 mb-6 line-clamp-3 text-sm md:text-base">{sponsor.description}</p>

                    {/* CTA button */}
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSponsorClick(sponsor.id || index.toString())}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105"
                    >
                      Visitar sitio
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17"></path>
                      </svg>
                    </a>

                    {/* Animated highlight line */}
                    <div className="h-0.5 w-0 bg-yellow-400 mt-4 transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="absolute -top-1 -right-1 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a sponsor CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">¿Quieres convertirte en sponsor?</h3>
            <p className="text-gray-300 mb-6">
              Únete a nuestra red de partners y accede a una audiencia exclusiva de profesionales y entusiastas.
            </p>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              Solicitar información
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute left-0 right-0 h-[2px] bottom-12 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
    </section>
  )
}

export default SponsorSection