//tengo que crear el single get den el back de course y luego de merch y aplciar la misma tecnic a de creators pero para  courses y luego seguira para merch, e igual menete crear el all para mostrar todas las secciones princpiales de cada uno de estos 
import { Course } from "@/types/courses.types"
import { CourseSingle } from "@/components/singles/CourseSingle"
const page = async ({params}: {params:{courseId: string}  }) => {
    const uid = params.courseId
    const preRenderCourse: Course = await fetch(`http://localhost:5000/api/courses/${uid}`).then((res)=>{
        if(!res.ok){
            throw new Error("hubo un error")
        }
       return res.json()
    }).catch((err)=> console.log(err))


  return (
    <div  className="py-40 bg-red-300 text-center">

<CourseSingle uuid={uid} initialDataCourse={preRenderCourse} />

    </div>
  )
}
export default page