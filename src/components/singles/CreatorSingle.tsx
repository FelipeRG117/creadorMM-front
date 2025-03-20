"use client"
import { Spin } from "antd";
import { FC } from "react";
import { Creators } from "@/types/creator.types";
import useFetchSingleCreator from "@/hooks/useFetchSingleCreator";


interface CreatorsProps {
    initialCreators: Creators
}
//aqui vamos a mostrar la imagen a la mitad de la pantalla del lado derecho y el nombre y presentacion del lado izquierdo
//debajo de todo este cuadro que abarcara tofda la panatalla, iran sus respectivas secciones de cursos merch sponsors, contenido destacado, 

export const Creator: FC<CreatorsProps> = ({initialCreators}) => {
 //aqui ocupamos primnero la interface de lo que vamos a recibir 
const {dataCreator, loading, error} = useFetchSingleCreator()
//const creators = dataCreators.length > initialCreators.length? dataCreators: initialCreators
//Vamos a moficiar el componente de CreatorsAlL, estilizando y aocmoddando correctamente los div de como se mostraran cada uno de estos 

//aqui solo mostrareos el nombre de lkos creadores yt su foto, con ocpion para que envie al single 
 return(
    <div className="p-20 bg-cyan-400 border border-black">
            {loading ? <Spin/> : (<div className="bg-red-300">
                <h1>{dataCreator?.creatorName} </h1>
            </div> )}
       
    </div>
  )
}
