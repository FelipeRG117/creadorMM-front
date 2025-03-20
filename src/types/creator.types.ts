import { Institutions } from "./institutions.types";
import { Sponsor } from "./sponsors.types";
import { Merch } from "./merch.types";
import { Course } from "./courses.types";


//interface de campos para creators
export interface Creators {
   readonly id:  string;
    email: string;
    creatorName: string;
    name?: string;
    images: string[];
    militaryGrade: string;
    institutions: Institutions;
    sponsors: Sponsor[] ;
    merches: Merch[];
    courses: Course[];
    notification: boolean
} 
