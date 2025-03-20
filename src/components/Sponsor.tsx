import { FC } from "react";
import { Sponsor } from "@/types/sponsors.types";
import { v4 as uuidv4 } from "uuid";

interface SponsorProps{
    sponsors: Sponsor[]
}
const SponsorComponent: FC<SponsorProps> = ({ sponsors }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {sponsors.map((sponsor, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
      >
        <img
          src={sponsor.imgs[0]}
          alt="Foto de sponsor"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <a
            href={sponsor.website}
            target="_blank" 
            rel="noopen  er noreferrer"
            className="text-blue-600 hover:underline"
          >
            <h2 className="text-xl font-semibold mb-2">{sponsor.name}</h2>
          </a>
          <p className="text-gray-600 mb-4">{sponsor.description}</p>
          <p className="text-sm text-gray-500 mb-4">Visitas: {sponsor.clickCounts}</p>

          {sponsor.sponseredCreators.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Creadores Patrocinados:</h3>
              <ul className="list-disc pl-5">
                {sponsor.sponseredCreators.map((creator, ind) => (
                  <li key={ind} className="text-gray-700">
                    {creator.creatorName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

  
  
export default SponsorComponent;


