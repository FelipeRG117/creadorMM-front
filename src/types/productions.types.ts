import { Creators } from "./creator.types";
import { Institutions } from "./institutions.types";

interface User {
    id: string;
    name: string
}

export interface RelatedEntity {
    id: string;
    type: EntityType;
};


export type EntityType = "creators" | "institutions"

export interface Production {
    id: string; 
    relatedEntity: RelatedEntity;
    entityType: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl?: string;
    tags: string[];
    views: number;
    likes: User[]
    isFeatured: boolean; 
}




