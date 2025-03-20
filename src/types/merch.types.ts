import { Creators } from "./creator.types";


//interface to merch
export interface Merch{
   readonly id: string;
    name: string;
    description: string;
    price: number; 
    category: number[];
    stock: number;
    sizes: string[];
    images: string[];
    afiliatedCreators: Creators[];
    discount?: number;
    isFeatured?: boolean;
    offer?: boolean;
}

