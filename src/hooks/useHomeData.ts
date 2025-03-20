"use client"
import  useFetchData  from './useFetchData'
import { Creators } from '@/types/creator.types'
import { Sponsor } from '@/types/sponsors.types'
import { Production } from '@/types/productions.types'
import { Course } from '@/types/courses.types'


const useHomeData = () => {
  const {data: dataCreators, loading:  loadingCreators, error: errorCreators  } = useFetchData<Creators>("http://localhost:5000/api/creators");
  
  const {data: dataSponsors, loading: loadingSponsors, error: errorSponsors } = useFetchData<Sponsor>("http://localhost:5000/api/sponsor");

  const {data: dataProduction, loading: loadingProduction, error: errorPorudction } = useFetchData<Production>("http://localhost:5000/api/production");
  const {data: dataCourses, loading: loadingCourses, error: errorCourses } = useFetchData<Course>("http://localhost:5000/api/courses");

    return {dataCreators, dataSponsors, dataProduction,dataCourses, loadingCreators, errorCreators}
  
}

export default useHomeData;