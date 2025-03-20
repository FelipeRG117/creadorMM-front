import { FC} from "react";
import { Creators } from "@/types/creator.types";
import { v4 as uuidv4 } from "uuid";

interface CreatorProps{
    creators: Creators[];
}
//aqui en creator mostraremos su imagen, descripcion de  este creador, ya sea trayectoria, historial o aportaciones, esto mismo abracara cada parte la miotad de la ántalla y el total de largo, debajo de esta vendran las secciones de su merch, cursos, contenido visual, sponsors, y su intitucion perteneciente, como en la seccion de sponsors pero de intituciones para que envie a link de esa misma  estas secciones en su single 
const CreatorComponent: FC<CreatorProps> = ({ creators }) => (
  <div className="space-y-8">
    {creators.map((creator) => (
      <div
        key={uuidv4()}
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-900"
      >
        <img
          src={creator.images[0]}
          alt={`${creator.creatorName}'s image`}
          className="w-full  h-48 object-cover  rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          Nombre: {creator.creatorName}
        </h2>
        <h3 className="text-lg text-gray-600">
          Grado: {creator.militaryGrade}
        </h3>
        <h3 className="text-lg text-gray-600">
          Institución: {creator.institutions.name}
        </h3>

        {creator.sponsors.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Sponsors:</h4>
            <ul className="list-disc ml-5 text-gray-600">
              {creator.sponsors.map((sponsor, inde) => (
                <li key={inde}>
                  <h3>{sponsor.name}</h3>
                </li>
              ))}
            </ul>
          </div>
        )}

        {creator.merches.length > 0 && (
          <div className="mt-4">
           
            {creator.merches.map((merch) => (
              <div
                key={uuidv4()}
                className="border-t border-gray-200 pt-4 mt-4"
              >
                 <h4 className="font-medium text-gray-700 mb-2">Merch:</h4>
                <h2 className="text-base font-medium text-gray-800">
               {merch.name}
                </h2>
                <p className="text-sm text-gray-600">{merch.description}</p>
                <h3 className="text-sm text-gray-500">Categoría: {merch.category}</h3>
                <h3 className="text-sm text-gray-500">Oferta: {merch.offer}</h3>
              </div>
            ))}
          </div>
        )}

        {creator.courses.length > 0 && (
          <div className="mt-4">
            {creator.courses.map((course, index) => (
              <div
                key={index}
                className="border-t border-gray-200 pt-4 mt-4"
              >
                  <h4 className="font-medium text-gray-700 mb-2">Courses:</h4>
                <h2 className="text-base font-medium text-gray-800">
                 TITULO MAMPO {course.title}
                </h2>
                <h3 className="text-sm text-gray-500">Categoría: {course.category}</h3>
                {course.tags.length > 0 && (
                  <ul className="list-disc ml-5 text-gray-600 mt-2">
                    {course.tags.map((tag, i) => (
                      <li key={i}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default CreatorComponent; 
