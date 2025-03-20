"use client"
import React, { FC, useState, useEffect } from 'react'
import { Production } from '@/types/productions.types'
import useHomeData from '@/hooks/useHomeData';
import Link from 'next/link';

interface ProductionSectionProps {
  initialProductions: Production[];
}

export const ProductionSection: FC<ProductionSectionProps> = ({ initialProductions }) => {
  const { dataProduction, loadingCreators, errorCreators } = useHomeData()
  const productions = Array.isArray(dataProduction) && dataProduction.length > 0 ? dataProduction : initialProductions

  const itemsPerPage = 3
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(productions.length / itemsPerPage)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Simular la animación de entrada que teníamos con framer-motion
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const paginatedProductions = productions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loadingCreators) {
    return (
      <div className="flex justify-center items-center h-96 bg-black">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-gray-700 rounded-md mb-8"></div>
          <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
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
        <p className="text-xl">Hubo un error al cargar las producciones. Por favor, intenta de nuevo más tarde.</p>
      </div>
    )
  }

  return (
    <section className="pt-16 pb-36 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-fixed"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="container mx-auto relative z-10">
        {/* Header with animated underline */}
        <div className="flex justify-between items-center px-4 md:px-6 mb-12">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
              Explora el contenido
            </h1>
            <div className="h-1 w-1/2 bg-gradient-to-r from-teal-400 to-teal-600 mt-2 rounded-full"></div>
          </div>
          <Link
            href="/producciones"
            className="group flex items-center gap-2 text-teal-400 font-semibold text-lg hover:text-teal-300 transition-colors duration-300"
          >
            Ver más
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
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
            </span>
          </Link>
        </div>

        {/* Productions grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-12 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {paginatedProductions.map((production, index) => (
            <div
              key={production.id || index}
              className={`transform transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(production.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="group bg-gray-900/60 backdrop-blur-sm border border-gray-800 overflow-hidden h-full transition-all duration-500 hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] rounded-xl">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={production.thumbnailUrl || "/placeholder.svg"}
                    alt={production.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={production.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-teal-500/90 hover:bg-teal-400 text-white p-4 rounded-full transform transition-transform duration-300 hover:scale-110"
                      aria-label={`Reproducir ${production.title}`}
                    >
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
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </a>
                  </div>

                  {/* Category badge */}
                  <span className="absolute top-3 right-3 bg-yellow-400/90 text-black font-medium px-2.5 py-0.5 rounded-full text-xs">
                    {production.entityType}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-teal-300 transition-colors duration-300">
                    {production.title}
                  </h2>
                  <p className="text-gray-300 mb-4 line-clamp-2">{production.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {production.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-800/80 text-gray-300 border border-gray-700 px-2.5 py-0.5 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {production.tags.length > 3 && (
                      <span className="bg-gray-800/80 text-gray-300 border border-gray-700 px-2.5 py-0.5 rounded-md text-xs">
                        +{production.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 flex justify-between items-center border-t border-gray-800 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-400">
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
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>{production.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
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
                        className="text-red-400"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span>{production.likes.length.toLocaleString()}</span>
                    </div>
                  </div>
                  <a
                    href={production.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 transition-colors duration-300"
                  >
                    Ver ahora
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6">
          <p className="text-gray-400 mb-4 md:mb-0">
            Mostrando <span className="text-teal-400 font-medium">{currentPage * itemsPerPage + 1}</span> -{" "}
            <span className="text-teal-400 font-medium">
              {Math.min((currentPage + 1) * itemsPerPage, productions.length)}
            </span>{" "}
            de <span className="text-teal-400 font-medium">{productions.length}</span> producciones
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-gray-800/80 border border-gray-700 hover:bg-gray-700 hover:text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10 rounded-md flex items-center justify-center transition-colors duration-200"
              aria-label="Página anterior"
            >
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
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`min-w-[40px] h-8 rounded-md flex items-center justify-center transition-colors duration-200 ${
                    currentPage === index
                      ? "bg-teal-500 hover:bg-teal-400 text-white"
                      : "bg-gray-800/80 border border-gray-700 hover:bg-gray-700 hover:text-teal-300 text-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="bg-gray-800/80 border border-gray-700 hover:bg-gray-700 hover:text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10 rounded-md flex items-center justify-center transition-colors duration-200"
              aria-label="Página siguiente"
            >
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute left-0 right-0 h-[2px] bottom-12 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
    </section>
  )
}

