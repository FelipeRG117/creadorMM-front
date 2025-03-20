"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface CarouselProps {
  images: string[]
  titles?: string[]
  descriptions?: string[]
  autoplaySpeed?: number // en milisegundos
  showContent?: boolean
  height?: string // altura personalizable
}

const Carousel = ({
  images,
  titles = [],
  descriptions = [],
  autoplaySpeed = 5000,
  showContent = true,
  height = "h-[600px]",
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [direction, setDirection] = useState<"next" | "prev" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Función para avanzar al siguiente slide
  const nextSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection("next")

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      setIsAnimating(false)
      setProgress(0)
    }, 500)
  }, [images.length, isAnimating])

  // Función para retroceder al slide anterior
  const prevSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection("prev")

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      setIsAnimating(false)
      setProgress(0)
    }, 500)
  }, [images.length, isAnimating])

  // Función para ir a un slide específico
  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return

      setIsAnimating(true)
      setDirection(index > currentIndex ? "next" : "prev")

      setTimeout(() => {
        setCurrentIndex(index)
        setIsAnimating(false)
        setProgress(0)
      }, 500)
    },
    [currentIndex, isAnimating],
  )

  // Gestión del autoplay
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }

      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
      }

      // Reiniciar el progreso
      setProgress(0)

      // Configurar el timer para el progreso (actualiza cada 50ms)
      progressTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          const increment = (50 / autoplaySpeed) * 100
          return Math.min(prev + increment, 100)
        })
      }, 50)

      // Configurar el timer para el cambio de slide
      autoplayTimerRef.current = setTimeout(() => {
        nextSlide()
      }, autoplaySpeed)
    }

    if (isAutoPlaying && !isHovering) {
      startAutoplay()
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
      }
    }
  }, [currentIndex, isAutoPlaying, isHovering, nextSlide, autoplaySpeed])

  // Gestión de eventos táctiles para swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Pausar/reanudar autoplay al hover
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Alternar autoplay
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${height} bg-gradient-to-b from-black to-gray-900`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-fixed"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Images container */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            } ${
              isAnimating && index === currentIndex && direction === "next"
                ? "animate-slide-in-right"
                : isAnimating && index === currentIndex && direction === "prev"
                  ? "animate-slide-in-left"
                  : ""
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
              style={{ backgroundImage: `url(${image})` }}
            ></div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70"></div>

            
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 md:px-8 z-30 -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="bg-black/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-teal-500/80 hover:scale-110 border border-white/10"
          aria-label="Slide anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        <button
          onClick={nextSlide}
          className="bg-black/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-teal-500/80 hover:scale-110 border border-white/10"
          aria-label="Siguiente slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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

      {/* Indicators and controls */}
      <div className="absolute bottom-4 left-0 right-0 z-30 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          {/* Indicators */}
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                  index === currentIndex ? "w-10 bg-teal-500" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              >
                {index === currentIndex && isAutoPlaying && !isHovering && (
                  <div className="absolute inset-0 bg-white/50" style={{ width: `${progress}%` }}></div>
                )}
              </button>
            ))}
          </div>

          
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute left-0 right-0 h-[2px] bottom-0 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
    </div>
  )
}


export default Carousel;
