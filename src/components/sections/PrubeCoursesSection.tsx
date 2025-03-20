"use client";
import useHomeData from '@/hooks/useHomeData';
import { Course } from '@/types/courses.types';
import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';

interface CoursesSectionProps {
  initialDataCourses: Course[];
}


export const PrubeCoursesSection: FC<CoursesSectionProps> = ({ initialDataCourses }) => {
  const { dataCourses, loadingCreators, errorCreators } = useHomeData()
  const courses = Array.isArray(dataCourses) && dataCourses.length > 0 ? dataCourses : initialDataCourses

  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(0)
  const [expandedBenefits, setExpandedBenefits] = useState<boolean[]>([])

  // Inicializar el estado expandedBenefits
  useEffect(() => {
    if (courses.length > 0) {
      setExpandedBenefits(new Array(courses[currentCourseIndex].plans.length).fill(false))
    }
  }, [currentCourseIndex, courses])

  // Simular la animación de entrada
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const goToPreviousCourse = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("prev")
    setTimeout(() => {
      setCurrentCourseIndex((prevIndex) => (prevIndex === 0 ? courses.length - 1 : prevIndex - 1))
      setSelectedPlan(0)
      setIsAnimating(false)
    }, 300)
  }

  const goToNextCourse = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("next")
    setTimeout(() => {
      setCurrentCourseIndex((prevIndex) => (prevIndex === courses.length - 1 ? 0 : prevIndex + 1))
      setSelectedPlan(0)
      setIsAnimating(false)
    }, 300)
  }

  const toggleBenefits = (planIndex: number) => {
    setExpandedBenefits((prev) => {
      const newState = [...prev]
      newState[planIndex] = !newState[planIndex]
      return newState
    })
  }

  if (loadingCreators) {
    return (
      <div className="flex justify-center items-center h-96 bg-black">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-800 rounded-md mb-4"></div>
          <div className="h-4 w-48 bg-gray-700 rounded-md mb-12"></div>
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl px-6">
            <div className="w-full md:w-1/2 h-96 bg-gray-800 rounded-xl"></div>
            <div className="w-full md:w-1/2 h-96 bg-gray-800 rounded-xl"></div>
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
          <h2 className="text-xl font-bold mb-2">Error al cargar los cursos</h2>
          <p className="text-gray-400">Lo sentimos, ha ocurrido un error al cargar los cursos destacados.</p>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const currentCourse = courses[currentCourseIndex]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-fixed"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-yellow-500/5 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Header with animated elements */}
        <div className="mb-16 max-w-3xl">
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
              className="text-yellow-400 mb-2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 mb-4">
            Cursos Destacados
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-teal-600 mb-6 rounded-full"></div>
          <p className="text-gray-300 text-lg">
            Explora nuestra selección de cursos premium impartidos por expertos reconocidos en la industria.
          </p>
        </div>

        {/* Course showcase */}
        <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Course image */}
            <div className="w-full lg:w-5/12 relative overflow-hidden rounded-xl shadow-2xl">
              <div
                className={`relative h-[28rem] transition-transform duration-300 ${
                  isAnimating
                    ? direction === "next"
                      ? "translate-x-full opacity-0"
                      : "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url(${currentCourse.images[0] || "/placeholder.svg?height=600&width=800"})`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>

                {/* Category badge */}
                <div className="absolute top-6 right-6 bg-yellow-400/90 text-black font-medium px-3 py-1 rounded-full text-sm shadow-lg">
                  {currentCourse.category}
                </div>

                {/* Active status */}
                <div
                  className={`absolute bottom-6 left-6 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${
                    currentCourse.isActive ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                  }`}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      currentCourse.isActive ? "bg-white animate-pulse" : "bg-white"
                    }`}
                  ></span>
                  {currentCourse.isActive ? "Curso Activo" : "Curso Inactivo"}
                </div>

                {/* Course title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-3xl font-bold text-white mb-2">{currentCourse.title}</h3>
                  <p className="text-gray-300 line-clamp-2">{currentCourse.description}</p>
                </div>
              </div>
            </div>

            {/* Course details */}
            <div className="w-full lg:w-7/12">
              <div
                className={`bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg h-full transition-all duration-300 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] ${
                  isAnimating
                    ? direction === "next"
                      ? "-translate-x-full opacity-0"
                      : "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <div className="p-6 md:p-8">
                  {/* Course creators */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
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
                        className="mr-2"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      Instructores
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentCourse.creators.map((creator, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center bg-teal-900/40 text-teal-300 rounded-full px-3 py-1 text-sm"
                        >
                          {creator.creatorName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Course tags */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
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
                        className="mr-2"
                      >
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                      Etiquetas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentCourse.tags.map((tag, i) => (
                        <span key={i} className="bg-yellow-900/40 text-yellow-300 rounded-full px-3 py-1 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Course plans */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
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
                        className="mr-2"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                      Planes Disponibles
                    </h4>

                    <div className="space-y-4">
                      {currentCourse.plans.map((plan, planIndex) => (
                        <div
                          key={planIndex}
                          className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                            selectedPlan === planIndex
                              ? "border-yellow-500 shadow-md bg-yellow-900/10"
                              : "border-gray-700 hover:border-yellow-700 hover:shadow-sm"
                          }`}
                        >
                          <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => setSelectedPlan(planIndex)}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${
                                  selectedPlan === planIndex ? "border-yellow-500 bg-yellow-500" : "border-gray-500"
                                }`}
                              >
                                {selectedPlan === planIndex && <div className="w-2 h-2 rounded-full bg-black"></div>}
                              </div>
                              <div>
                                <h5 className="font-semibold text-white">{plan.planName}</h5>
                                <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                  <span className="flex items-center">
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
                                      className="mr-1"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    {plan.duration}
                                  </span>
                                  <span className="font-medium text-yellow-400">{plan.price}</span>
                                </div>
                              </div>
                            </div>
                            <button
                              className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                                expandedBenefits[planIndex]
                                  ? "bg-yellow-900/60 text-yellow-300"
                                  : "bg-gray-800 text-gray-300 hover:bg-yellow-900/30 hover:text-yellow-200"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleBenefits(planIndex)
                              }}
                            >
                              {expandedBenefits[planIndex] ? "Ocultar" : "Ver beneficios"}
                            </button>
                          </div>

                          {/* Expanded benefits */}
                          {expandedBenefits[planIndex] && (
                            <div className="p-4 pt-0 border-t border-gray-700 bg-gray-800/50">
                              <h6 className="font-medium text-sm text-gray-300 mb-2">Beneficios:</h6>
                              <ul className="space-y-2">
                                {plan.benefits.map((benefit, j) => (
                                  <li key={j} className="flex items-start text-sm text-gray-300">
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
                                      className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                                    >
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="mt-8 flex justify-center">
                    <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                      Inscribirse al curso
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
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-12 gap-4">
            <button
              onClick={goToPreviousCourse}
              className="bg-gray-800/80 border border-gray-700 hover:bg-gray-700 hover:text-yellow-300 h-12 w-12 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Curso anterior"
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
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index > currentCourseIndex) {
                      setDirection("next")
                    } else if (index < currentCourseIndex) {
                      setDirection("prev")
                    }
                    setIsAnimating(true)
                    setTimeout(() => {
                      setCurrentCourseIndex(index)
                      setSelectedPlan(0)
                      setIsAnimating(false)
                    }, 300)
                  }}
                  className={`min-w-[40px] h-10 rounded-md flex items-center justify-center transition-colors duration-200 ${
                    currentCourseIndex === index
                      ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                      : "bg-gray-800/80 border border-gray-700 hover:bg-gray-700 hover:text-yellow-300 text-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextCourse}
              className="bg-gray-800/80 border border-gray-700 hover:bg-gray-700 hover:text-yellow-300 h-12 w-12 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Curso siguiente"
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

          {/* View all courses link */}
          <div className="text-center mt-12">
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 text-yellow-400 font-semibold text-lg hover:text-yellow-300 transition-colors duration-300 group"
            >
              Ver todos los cursos
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
      </div>

      {/* Bottom decorative line */}
      <div className="absolute left-0 right-0 h-[2px] bottom-12 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
    </section>
  )
}