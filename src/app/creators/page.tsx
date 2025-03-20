import { CreatorsAll } from "@/components/CreatorsAll";
const page = async () => {
 //aqui ocupamos primnero la interface de lo que vamos a recibir 
 const {dataCreators} = await fetch("http://localhost:5000/api/creators").then((res)=> res.json()).catch((err)=> []);
//aqui mucho no vamos a hacer para manetner esta page como SSR

//Vamos a moficiar el componente de CreatorsAlL, estilizando y aocmoddando correctamente los div de como se mostraran cada uno de estos 

//datos interesantes/importantes a mostrar en su card
// 1-institucion perteneciente,2-categoria de merches, 3-categroia de courses, 4-Boton de ntificacion activa/desactiva, 5-sponsors extras/afiliados exclusivos, 6-claro que su Creator Name
return(
    <CreatorsAll initialCreators={dataCreators}/>
)
}

export default page

