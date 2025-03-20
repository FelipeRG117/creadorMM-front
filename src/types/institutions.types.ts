import { Creators } from "./creator.types";



//interface to institutions
export interface Institutions {
   readonly id: string;
    name: string;
    description: string;
    websites: string[];
    images: string[];
    adress: string[];
    contactEmail: string[];
    contactPhones: number[];
    afiliatedCreators: Creators[];
    estabilishedDate: string;
}

