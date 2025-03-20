"use client"
import useFetchSingleData from '../useFetchSingleData';
import { Course } from '@/types/courses.types';
 // Valor por defecto para Creators
const defaultCourse: Course = {
        id: "", 
        title: "",
        description: "",
        category: "", 
        images: [],
        videos: [], 
        plans: [],
        creators: [],
        tags: [],
        isActive: false,
  }; 
const useFetchCourseSingle = (id: string) => {
 const {data: dataCourse, loading, error} = useFetchSingleData<Course>(`http://localhost:5000/api/courses/${id}`, defaultCourse);

 return {dataCourse, loading, error}
}
export default useFetchCourseSingle;