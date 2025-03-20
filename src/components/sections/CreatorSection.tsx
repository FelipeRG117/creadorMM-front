"use client"
import { FC, useState, useEffect } from "react";
import { Creators } from "@/types/creator.types";
import  useHomeData  from "@/hooks/useHomeData";
import Link from "next/link";

interface CreatorsSectionProps {
  initialCreators: Creators[]
}

export const CreatorsSection: FC<CreatorsSectionProps> = ({ initialCreators }) => {
  const { dataCreators, loadingCreators, errorCreators } = useHomeData()
  const creators: Creators[] = Array.isArray(dataCreators) && dataCreators.length > 0 ? dataCreators : initialCreators

  const [isVisible, setIsVisible] = useState(false)
  const [activeCreator, setActiveCreator] = useState<string | null>(null)

  // Simular la animación de entrada
  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (loadingCreators) {
    return (
      <div className="flex justify-center items-center h-96 bg-black">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-800 rounded-md mb-4"></div>
          <div className="h-4 w-48 bg-gray-700 rounded-md mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-96 bg-gray-800 rounded-xl"></div>
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
          <h2 className="text-xl font-bold mb-2">Error al cargar los creadores</h2>
          <p className="text-gray-400">Lo sentimos, ha ocurrido un error al cargar los creadores destacados.</p>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-fixed"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-teal-500/5 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 mb-4">
            Creadores Destacados
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-300 text-lg">
            Conoce a los expertos que están revolucionando la industria con su contenido exclusivo.
          </p>
        </div>

        {/* Creators grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {creators.map((creator, index) => (
            <div
              key={creator.id || index}
              className={`transform transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveCreator(creator.id || index.toString())}
              onMouseLeave={() => setActiveCreator(null)}
            >
              <div className="group relative h-[28rem] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-800">
                {/* Background image with parallax effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${creator.images[0] || "/placeholder.svg?height=600&width=800"})`,
                    transform: activeCreator === (creator.id || index.toString()) ? "scale(1.05)" : "scale(1)",
                  }}
                ></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>

                {/* Glowing border effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-xl border border-teal-400/30 shadow-[0_0_15px_rgba(45,212,191,0.3)]"></div>
                </div>

                {/* Creator profile image */}
                <div className="absolute top-6 left-6 transform transition-all duration-500 group-hover:scale-110">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-teal-400 shadow-lg">
                      <img
                        src={creator.images[1] || creator.images[0] || "/placeholder.svg?height=200&width=200"}
                        alt={`${creator.creatorName} profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs">
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
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Social media icons */}
                <div className="absolute top-6 right-6 flex space-x-2">
                   (
                    <a
                      href={creator.email}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-teal-500 transition-colors duration-300"
                    >
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
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  
                  
                    <a
                      href={creator.email}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-teal-500 transition-colors duration-300"
                    >
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
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  
                   (
                    <a
                      href={creator.email}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-teal-500 transition-colors duration-300"
                    >
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
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                  
                </div>

                {/* Followers badge */}
                {creator.sponsors && (
                  <div className="absolute top-20 left-6 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-300 flex items-center space-x-1 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>{creator.sponsors.toLocaleString()} seguidores</span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 group-hover:translate-y-0">
                  <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-teal-300 transition-colors duration-300">
                    {creator.creatorName}
                  </h3>

                  {/* Sponsors */}
                  {creator.sponsors.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
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
                          className="mr-2"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                          <path d="M2 17l10 5 10-5"></path>
                          <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        Colabora con
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {creator.sponsors.map((sponsor) => sponsor.description).join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Courses */}
                  {creator.courses.length > 0 && (
                    <div className="mb-4 transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
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
                          className="mr-2"
                        >
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                        Cursos impartidos
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.courses.map((course, i) => (
                          <span
                            key={i}
                            className="bg-teal-900/60 text-teal-300 rounded-full px-3 py-1 text-xs font-medium"
                          >
                            {course.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA button */}
                  <div className="mt-6 transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <a
                      href={`/creadores/${creator.id || index}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105"
                    >
                      Ver perfil completo
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
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>

                  {/* Animated highlight line */}
                  <div className="h-0.5 w-0 bg-teal-400 mt-4 transition-all duration-500 group-hover:w-full"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="absolute -top-1 -right-1 w-20 h-20 bg-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all creators link */}
        <div className="text-center mt-12">
          <Link
            href="/creadores"
            className="inline-flex items-center gap-2 text-teal-400 font-semibold text-lg hover:text-teal-300 transition-colors duration-300 group"
          >
            Ver todos los creadores
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute left-0 right-0 h-[2px] bottom-12 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
    </section>
  )
}

export default CreatorsSection;
