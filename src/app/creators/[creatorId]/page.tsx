import { Creators } from "@/types/creator.types";
import { Creator } from "@/components/singles/CreatorSingle";


const page  = async  ({ params }: { params: { creatorId: string }})=> {
    const creatorId = params.creatorId;
    console.log("esto es id", creatorId)
    //ya tenemos el fetch de single ahor avamos a pedir el fetch por aqui y lueo en el otro componente loo pediremos pero con el hook de esta manera tenderemos ssr y scc, vamos a tommar por aqui el id 
const creator: Creators = await fetch(`http://localhost:5000/api/creators/${creatorId}`).then((res)=> {
    if(!res.ok){
        throw new Error("Solicitud No Ok")
    }
    if(!creator){
        <p>esto no es creadores </p>
    }
  return res.json();
}).catch((err)=> console.log(err))

//aqui vamos a caprturar el id y ponerlo con ${} y hacer un llamado de fetch by ID 
    return(
        <div className="py-40 bg-orange-300 text-center text-3xl font-bold">
            {creatorId}
            <h1>Esto es page de creator unico</h1>
            <img src="https://img.freepik.com/foto-gratis/oso-pardo-bosque_181624-45531.jpg?t=st=1741991483~exp=1741995083~hmac=9d2cabaf17a0bd5525577f8e4338efb0cc141953a0a70b8cd7d7baec56f1fcea&w=740" alt="oso" />
            <Creator initialCreators={creator}/>
        </div>
    )
}
export default page