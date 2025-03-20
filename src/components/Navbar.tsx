"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  // Detectar scroll para cambiar la apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Cerrar el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Determinar si un enlace está activo
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname?.startsWith(path)) return true
    return false
  }

  const navLinks = [
    { name: "Cursos", path: "/courses", icon: "graduation-cap" },
    { name: "Creadores", path: "/creators", icon: "users" },
    { name: "Sponsors", path: "/sponsors", icon: "briefcase" },
    { name: "Instituciones", path: "/institutions", icon: "building" },
    { name: "Preguntas", path: "/faq", icon: "help-circle" },
  ]

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-black/80 backdrop-blur-md shadow-lg"
          : "py-4 bg-gradient-to-b from-black/90 to-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-yellow-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-5 py-2 bg-black bg-opacity-80 ring-1 ring-gray-800 rounded-lg leading-none flex items-center">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-500 mr-1">
                    CreadorMilitar
                  </span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
                    MX
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative group ${
                    isActive(link.path) ? "text-teal-400 font-medium" : "text-gray-300 hover:text-white"
                  } text-lg transition-colors duration-300 flex items-center`}
                  onMouseEnter={() => setHoveredItem(link.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="flex items-center">
                    <span className="mr-2">
                      {link.icon === "graduation-cap" && (
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
                          className={`transition-transform duration-500 ${
                            hoveredItem === link.path ? "scale-125" : "scale-100"
                          }`}
                        >
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                        </svg>
                      )}
                      {link.icon === "users" && (
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
                          className={`transition-transform duration-500 ${
                            hoveredItem === link.path ? "scale-125" : "scale-100"
                          }`}
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      )}
                      {link.icon === "briefcase" && (
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
                          className={`transition-transform duration-500 ${
                            hoveredItem === link.path ? "scale-125" : "scale-100"
                          }`}
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                      )}
                      {link.icon === "building" && (
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
                          className={`transition-transform duration-500 ${
                            hoveredItem === link.path ? "scale-125" : "scale-100"
                          }`}
                        >
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                          <path d="M9 22v-4h6v4"></path>
                          <path d="M8 6h.01"></path>
                          <path d="M16 6h.01"></path>
                          <path d="M12 6h.01"></path>
                          <path d="M12 10h.01"></path>
                          <path d="M12 14h.01"></path>
                          <path d="M16 10h.01"></path>
                          <path d="M16 14h.01"></path>
                          <path d="M8 10h.01"></path>
                          <path d="M8 14h.01"></path>
                        </svg>
                      )}
                      {link.icon === "help-circle" && (
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
                          className={`transition-transform duration-500 ${
                            hoveredItem === link.path ? "scale-125" : "scale-100"
                          }`}
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      )}
                    </span>
                    {link.name}
                  </span>

                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                      isActive(link.path)
                        ? "scale-x-100 bg-gradient-to-r from-teal-400 to-teal-500"
                        : "scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-yellow-400 to-yellow-500"
                    }`}
                  ></span>

                  {/* Hover glow effect */}
                  {hoveredItem === link.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 blur-sm"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Login/Register buttons for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium transition-all bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-md group"
            >
              <span className="relative text-white text-sm">Registrarse</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md border-t border-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                isActive(link.path) ? "bg-gray-900 text-teal-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }  px-3 py-2 rounded-md text-base font-medium flex items-center`}
            >
              <span className="mr-3">
                {link.icon === "graduation-cap" && (
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
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                  </svg>
                )}
                {link.icon === "users" && (
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )}
                {link.icon === "briefcase" && (
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
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                )}
                {link.icon === "building" && (
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
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <path d="M9 22v-4h6v4"></path>
                    <path d="M8 6h.01"></path>
                    <path d="M16 6h.01"></path>
                    <path d="M12 6h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 10h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M8 14h.01"></path>
                  </svg>
                )}
                {link.icon === "help-circle" && (
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                )}
              </span>
              {link.name}
            </Link>
          ))}

          {/* Mobile login/register buttons */}
          <div className="pt-4 pb-3 border-t border-gray-800 flex flex-col space-y-3">
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="block mx-3 py-2 text-center rounded-md text-base font-medium bg-gradient-to-r from-teal-500 to-teal-600 text-white"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
    </nav>
  )
}



