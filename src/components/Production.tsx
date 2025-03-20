import { FC } from "react";
import { Production } from "@/types/productions.types";
import { v4 as uuidv4 } from "uuid";



interface ProductionProps{
    productions: Production []
}

const ProductionComponent: FC<ProductionProps> = ({ productions }) => (
  <div className="space-y-6 p-6 bg-gray-100">
    {productions.map((production, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
      >
        <a
          href={production.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <img
            src={production.thumbnailUrl}
            alt="Miniatura del video"
            className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
              {production.title}
            </h2>
            <p className="text-gray-600 mt-2">{production.description}</p>
            <h2 className="text-sm text-gray-500 mt-2">{production.entityType}</h2>
            <div className="mt-4">
              <h4 className="text-sm text-gray-700">
                Views: <span className="font-medium">{production.views}</span>
              </h4>
              <h4 className="text-sm text-gray-700">
                Likes: <span className="font-medium">{production.likes.length}</span>
              </h4>
            </div>
            <h2 className="text-lg font-medium text-gray-800 mt-4">Tags</h2>
            {production.tags.length > 0 && (
              <div className="flex flex-wrap mt-2">
                {production.tags.map((tag, inde) => (
                  <p
                    key={inde}
                    className="text-sm bg-blue-100 text-blue-600 rounded-full px-3 py-1 m-1"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            )}
          </div>
        </a>
      </div>
    ))}
  </div>
);
  
export default ProductionComponent;