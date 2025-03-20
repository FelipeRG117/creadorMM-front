"use client"
import React, { useEffect, useState } from 'react'

const useFetchData = <T,>(url: string) => {
const [data, setData] = useState<T[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null)

useEffect(()=>{
const fetchData = async ()=>{
    try {
        const responseData = await fetch(url);
        if(!responseData.ok) throw new Error("problema en el fetching de datos")
            const jsonData: T[] = await responseData.json()
        setData(jsonData)

    } catch (err) {
        setError((err as Error).message)
    }finally{
    setLoading(false)
    }
}

fetchData()
},[url])

  return{data, loading, error}
  
}


export default useFetchData;