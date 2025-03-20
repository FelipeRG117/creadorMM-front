import { Creators } from "./creator.types";
import { Production } from "./productions.types";


//interface to course
export interface Plan {
    planName: string;
    price: number;
    duration?: string;
    benefits: string[];
}

export interface Course {
   readonly id: string; 
    title: string;
    description: string;
    category: string; 
    images: string[];
    videos?: Production[], 
    plans: Plan[];
    creators: Creators[];
    tags: string[];
    isActive: boolean;

}