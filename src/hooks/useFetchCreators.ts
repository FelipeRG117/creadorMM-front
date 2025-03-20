"use client"
import useFetchData from './useFetchData'
import { Creators } from '@/types/creator.types';

const useFetchCreators = () => {
 const {data: dataCreators, loading, error} = useFetchData<Creators>("http://localhost:5000/api/creators");

 return {dataCreators, loading, error}
}
export default useFetchCreators