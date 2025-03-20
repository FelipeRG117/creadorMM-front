
import { FC,  } from "react";
import CreatorComponent from "@/components/Creator";
import ProductionComponent from "@/components/Production";
import CourseComponent from "@/components/Course";
import SponsorComponent from "@/components/Sponsor";
import { Creators } from "@/types/creator.types";
import { Production } from "@/types/productions.types";
import { Course } from "@/types/courses.types";
import { Sponsor } from "@/types/sponsors.types";
import CreatorsSection from "@/components/sections/CreatorSection";
import SponsorSection from "@/components/sections/SponsorSection";
import Carousel from "@/components/Carousel";
import "../utils/carusel3.png"
import { PrubeCoursesSection } from "@/components/sections/PrubeCoursesSection";
interface HomeProps{
  creators: Creators[], 
  productions: Production[],
  courses: Course[],
  sponsors: Sponsor[]
}
import carusel1 from "../utils/carusel1.png"
import { ProductionSection } from "@/components/sections/ProductionSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
const images = [
"https://img.freepik.com/foto-gratis/soldados-ejercito-luchando-armas-defendiendo-su-pais_1303-26679.jpg?t=st=1741488061~exp=1741491661~hmac=c61b768ba92315660e6264d96415b60cdf7a6c847058b575936a6e58d1a19f75&w=740", 
"https://img.freepik.com/foto-gratis/viejo-soldado-uniforme-apuntando-rifle-francotirador_651396-1683.jpg?t=st=1741487949~exp=1741491549~hmac=70b3209e94a785790d115a87bd935cc501b834a4e2b430c79a5c3220fe4dcbf9&w=740","https://img.freepik.com/foto-gratis/militar-equipo-completo-reloj-mano-sostiene-ametralladora-mientras-posa-fotografo-sobre-fondo-oscuro_613910-21776.jpg?t=st=1741487891~exp=1741491491~hmac=6f5b4b6a38a990b5eb624cd11efabb65f8754e3c3fbb9798b4331aa118043040&w=740"
]

const Home =async() => {
  const creators: Creators[] = await fetch("http://localhost:5000/api/creators").then((res) => res.json()).catch((err) => []);
  const productions = await fetch("http://localhost:5000/api/production").then((res) => res.json()).catch((err) => []);
  const courses = await fetch("http://localhost:5000/api/courses").then((res) => res.json()).catch((err) => []);
  const sponsors: Sponsor[] = await fetch("http://localhost:5000/api/sponsor").then((res) => res.json()).catch((err) => []);

  return (
    <div >
      <Carousel images={images} />
      <CreatorsSection initialCreators={creators || []} />
      <ProductionSection initialProductions={productions || []}/>
      <SponsorSection initialSponsors={sponsors || []}/>
      <PrubeCoursesSection initialDataCourses={courses|| []}/>

    </div>
  );
};
export default Home;
