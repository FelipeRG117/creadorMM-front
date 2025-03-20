"use client"
import useHomeData from '@/hooks/useHomeData'
import { Course } from '@/types/courses.types'
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'


interface CoursesSectionProps{
    initialDataCourses: Course[]
}
export const CoursesSection: FC<CoursesSectionProps> = ({ initialDataCourses }) => {
  const { dataCourses, loadingCreators, errorCreators } = useHomeData()
  const courses = Array.isArray(dataCourses) && dataCourses.length > 0 ? dataCourses : initialDataCourses

  const [isVisible, setIsVisible] = useState(false)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<{ courseId: string; planIndex: number } | null>(null)

  // Simular la animación de entrada
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const toggleCourseExpansion = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null)
    } else {
      setExpandedCourse(courseId)
    }
  }

  const selectPlan = (courseId: string, planIndex: number) => {
    setSelectedPlan({ courseId, planIndex })
  }

  if (loadingCreators) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-b from-white to-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-md mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (errorCreators) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-b from-white to-gray-100 text-red-500">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-red-100 max-w-md">
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
          <p className="text-gray-600">
            Lo sentimos, ha ocurrido un error al cargar los cursos. Por favor, intenta de nuevo más tarde.
          </p>
          <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-teal-50 to-transparent opacity-70"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Header with animated underline */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-800 mb-4">
            Cursos Destacados
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg">
            Explora nuestra selección de cursos premium impartidos por expertos reconocidos en la industria.
          </p>
        </div>

        {/* Courses grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {courses.map((course, index) => (
            <div
              key={course.id || index}
              className={`transform transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 flex flex-col">
                {/* Course image with overlay */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={course.images[0] || "/placeholder.svg?height=400&width=600"}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Category badge */}
                  <span className="absolute top-4 right-4 bg-white/90 text-teal-700 font-medium px-3 py-1 rounded-full text-sm shadow-sm">
                    {course.category}
                  </span>

                  {/* Active status */}
                  <span
                    className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${
                      course.isActive ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                    }`}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        course.isActive ? "bg-white animate-pulse" : "bg-white"
                      }`}
                    ></span>
                    {course.isActive ? "Curso Activo" : "Curso Inactivo"}
                  </span>
                </div>

                {/* Course content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  {/* Creators */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
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
                      {course.creators.map((creator, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm"
                        >
                          {creator.creatorName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
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
                      {course.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-teal-50 text-teal-700 rounded-full px-2.5 py-0.5 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Plans */}
                  <div className="mt-auto">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
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

                    <div className="space-y-3">
                      {course.plans.map((plan, planIndex) => (
                        <div
                          key={planIndex}
                          className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                            selectedPlan?.courseId === (course.id || index.toString()) &&
                            selectedPlan?.planIndex === planIndex
                              ? "border-teal-500 shadow-md bg-teal-50"
                              : "border-gray-200 hover:border-teal-200 hover:shadow-sm"
                          }`}
                        >
                          <div
                            className="flex justify-between items-center p-3 cursor-pointer"
                            onClick={() => selectPlan(course.id || index.toString(), planIndex)}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${
                                  selectedPlan?.courseId === (course.id || index.toString()) &&
                                  selectedPlan?.planIndex === planIndex
                                    ? "border-teal-500 bg-teal-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedPlan?.courseId === (course.id || index.toString()) &&
                                  selectedPlan?.planIndex === planIndex && (
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                  )}
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-800">{plan.planName}</h5>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
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
                                  <span className="font-medium text-teal-700">{plan.price}</span>
                                </div>
                              </div>
                            </div>
                            <button
                              className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                                expandedCourse === (course.id || index.toString()) &&
                                selectedPlan?.courseId === (course.id || index.toString()) &&
                                selectedPlan?.planIndex === planIndex
                                  ? "bg-teal-100 text-teal-700"
                                  : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleCourseExpansion(course.id || index.toString())
                              }}
                            >
                              {expandedCourse === (course.id || index.toString()) ? "Ocultar" : "Detalles"}
                            </button>
                          </div>

                          {/* Expanded plan details */}
                          {expandedCourse === (course.id || index.toString()) &&
                            selectedPlan?.courseId === (course.id || index.toString()) &&
                            selectedPlan?.planIndex === planIndex && (
                              <div className="p-3 pt-0 border-t border-gray-100 bg-white">
                                <h6 className="font-medium text-sm text-gray-700 mb-2">Beneficios:</h6>
                                <ul className="space-y-1">
                                  {plan.benefits.map((benefit, j) => (
                                    <li key={j} className="flex items-start text-sm text-gray-600">
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
                                        className="text-teal-500 mr-2 mt-0.5 flex-shrink-0"
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
                </div>

                {/* Footer with CTA */}
                <div className="p-6 pt-0 border-t border-gray-100 mt-4">
                  <button className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center">
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
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all courses link */}
        <div className="text-center mt-12">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-teal-600 font-semibold text-lg hover:text-teal-800 transition-colors duration-300 group"
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
    </section>
  )
}