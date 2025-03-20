import { Creators } from "./creator.types";



//interface to sponsors 
export interface Sponsor{
   readonly id: string;
    name: string;
    imgs: string[];
    website: string;
    description: string;
    sponseredCreators: Creators[];
    clickCounts?: number;
    isActive?: boolean; 
}

