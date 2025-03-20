"use client"
import { Spin } from "antd";
import { FC } from "react";
import  useFetchCreators  from "@/hooks/useFetchCreators"
import { Creators } from "@/types/creator.types";

interface CreatorsProps {
    initialCreators: Creators[]
}
//poner spiner en el login 
//el spin cambiarlo por otro mejor y que no produzca errores

//Vamos a moficiar el componente de CreatorsAlL, estilizando y aocmoddando correctamente los div de como se mostraran cada uno de estos 

//datos interesantes/importantes a mostrar en su card
// 1-institucion perteneciente,2-categoria de merches, 3-categroia de courses, 4-Boton de ntificacion activa/desactiva, 5-sponsors extras/afiliados exclusivos, 6-claro que su Creator Name

export const CreatorsAll: FC<CreatorsProps> = ({initialCreators}) => {
 //aqui ocupamos primnero la interface de lo que vamos a recibir 
const {dataCreators, loading, error} = useFetchCreators();
//const creators = dataCreators.length > initialCreators.length? dataCreators: initialCreators
//Vamos a moficiar el componente de CreatorsAlL, estilizando y aocmoddando correctamente los div de como se mostraran cada uno de estos 

//aqui solo mostrareos el nombre de lkos creadores yt su foto, con ocpion para que envie al single 
 return(
    <div className="p-20 bg-cyan-400 border border-black">
    {loading ? <Spin/> : (<div className="border border-black bg-amber-200">
    <div className="top-0 text-center text-4xl font-bold">
    <h1>Esto es page de creators </h1>
    <img className="w-full h-129" src="https://img.freepik.com/foto-gratis/lobo-euroasiatico-habitat-invierno-blanco-hermoso-bosque-invierno_475641-702.jpg?t=st=1741989931~exp=1741993531~hmac=3d02691f7908d3d910e75ffffe02ddc90fcaa571dd3829961a41e44381573c0d&w=740" alt="lobo" />
    </div>
        <div className="flex flex-nowrap gap-4">
        {dataCreators?.map((creator, index)=>(
            <div key={index}  className="w-full h-auto p-6 m-4 border border-black bg-red-400" >
                {creator.images? <img src={creator.images[0]} alt={creator.creatorName} />: <div>OSOSOSO</div> }
                <h1 className="text-left font-semibold text-xl py-2">{creator.creatorName} </h1>
                <h2>Institucion perteneciente:{creator.institutions.name}</h2>
                {creator.merches.map((merch)=>( <p>Categorias de merches{merch.category} </p> ))}
                {creator.courses.map((course)=>( <p>Categorias de cursos impartidos: {course.category}</p> ))}
                 <p>Notificaciones: {creator.notification? <button> activas</button> : <button>desactivadas</button> }</p>
                 <p>Sponsors afiliados:  {creator.sponsors.map((sponsor)=>(<ul> <li>{sponsor.name} </li> </ul>  ))}
                 </p> 
            </div>

        ))}
        </div>
    </div> ) }

    </div>
)
}



