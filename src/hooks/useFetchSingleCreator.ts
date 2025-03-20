"use client"
import useFetchSingleData from './useFetchSingleData';
import { Creators } from '@/types/creator.types';


// Valor por defecto para Creators
const defaultCreator: Creators = {
    id: "",
    email: "",
    creatorName: "",
    name: "",
    images: [],
    militaryGrade: "",
    institutions: {
      id: "",
      name: "",
      description: "",
      websites: [],
      images: [],
      adress: [],
      contactEmail: [],
      contactPhones: [],
      afiliatedCreators: [],
      estabilishedDate: "",
    },
    sponsors: [],
    merches: [],
    courses: [],
    notification: false,
  };
const useFetchSingleCreator = () => {
 const {data: dataCreator, loading, error} = useFetchSingleData<Creators>("http://localhost:5000/api/creators/67632b1dce6736e9741640d1", defaultCreator);

 return {dataCreator, loading, error}
}
export default useFetchSingleCreator