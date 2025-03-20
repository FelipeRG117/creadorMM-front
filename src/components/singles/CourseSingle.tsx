"use client"
import useFetchCourseSingle from "@/hooks/singles/useFetchCourseSingle"
import { Course } from "@/types/courses.types"

interface initialData{
  uuid: string
  initialDataCourse: Course
}

export const CourseSingle= ({uuid, initialDataCourse}: initialData)=> {
const {dataCourse, loading, error} = useFetchCourseSingle(uuid)
const course = dataCourse && dataCourse.id !== ""? dataCourse : initialDataCourse
if(loading){
  return <p>cargando.....</p>
}
if(error){
  <p>Ocurrio un error</p>
}
  return (
    <div>{loading ? <p>cargando..</p>: (
    <div className="py-40 bg-red-300 text-center">{course.title}
    <img src={course.images[0]} alt="" />
    </div>)} </div>
  )
}

