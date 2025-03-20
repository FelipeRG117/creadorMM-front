"use client"

import type React from "react"

import { useState } from "react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setSubscriptionStatus("success")
      setEmail("")

      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setSubscriptionStatus("idle")
      }, 3000)
    }, 1500)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black pt-16 pb-8 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-fixed"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sección superior con logo y newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-gray-800">
          {/* Logo y descripción */}
          <div className="flex flex-col items-start">
            <div className="mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-5 py-2 bg-black bg-opacity-80 ring-1 ring-gray-800 rounded-lg leading-none flex items-center">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-500 mr-1">
                    CreadorMilitar
                  </span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-500">
                    MX
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 mb-8 max-w-md">
              Plataforma líder para creadores de contenido militar y entusiastas de la defensa. Conectamos a expertos,
              instituciones y aficionados en un espacio de aprendizaje y colaboración.
            </p>

            <div className="flex space-x-4 mb-8">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
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
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Discord"
              >
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
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                  <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Formulario de newsletter */}
          <div className="flex flex-col lg:items-end">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 max-w-md w-full shadow-lg hover:shadow-teal-500/5 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Únete a nuestra newsletter</h3>
              <p className="text-gray-400 mb-4">
                Recibe las últimas noticias, cursos y eventos directamente en tu bandeja de entrada.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || subscriptionStatus === "success"}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    subscriptionStatus === "success"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : subscriptionStatus === "success" ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      ¡Suscrito con éxito!
                    </>
                  ) : (
                    "Suscribirse"
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-2">
                  Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Enlaces del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Productos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
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
                className="mr-2 text-teal-400"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              Productos
            </h3>
            <ul className="space-y-3">
              {["Merch", "Cursos", "Videos", "Instituciones"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-teal-400 transition-colors duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 2: Recursos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
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
                className="mr-2 text-teal-400"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Recursos
            </h3>
            <ul className="space-y-3">
              {["Blog", "Tutoriales", "Foros", "Comunidad"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-teal-400 transition-colors duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Compañía */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
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
                className="mr-2 text-teal-400"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              Compañía
            </h3>
            <ul className="space-y-3">
              {["Acerca de", "Carreras", "Noticias", "Contacto"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-teal-400 transition-colors duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Soporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
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
                className="mr-2 text-teal-400"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Soporte
            </h3>
            <ul className="space-y-3">
              {["FAQ", "Ayuda", "Términos", "Privacidad"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-teal-400 transition-colors duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Aviso de derechos de autor */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} CreadorMilitarMX. Todos los derechos reservados.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-teal-400 text-sm transition-colors duration-300">
              Términos de servicio
            </a>
            <a href="#" className="text-gray-500 hover:text-teal-400 text-sm transition-colors duration-300">
              Política de privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-teal-400 text-sm transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Botón de volver arriba */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-8 bottom-8 w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg hover:bg-teal-500 transition-all duration-300 transform hover:scale-110"
        aria-label="Volver arriba"
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
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </footer>
  )
}

export default Footer

