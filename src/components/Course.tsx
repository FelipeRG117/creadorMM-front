import { FC } from "react";
import { Course } from "@/types/courses.types";
import { v4 as uuidv4 } from "uuid";

interface CourseProps{
    courses: Course[]
}

const CourseComponent: FC<CourseProps> = ({ courses }) => (
    <div>
      {courses.map((course) => (
        <div
          key={uuidv4()}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
        ><img src={course.images[0]} alt="portada de curso" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{course.description}</p>
          <p className="text-sm text-gray-500">Category: {course.category}</p>
          <div className="mt-4">
            {course.plans.map((plan, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-base font-medium text-gray-700">
                  Plan: {plan.planName} <hr />
                  Costo: {plan.price}
                </h4>
                <p className="text-sm text-gray-500">Duration: {plan.duration}</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {plan.benefits.map((benefit) => (
                    <li key={uuidv4()}>{benefit}</li>
                  ))}
                  {
                    course.creators.map((creator)=>(
                      <div  className="mb-4" key={uuidv4()}>
                        <h3 className="text-base font-medium text-gray-700">Creadores Afiliados</h3>
                        <h2 className="text-base font-medium text-gray-700">{creator.creatorName} </h2>
                      </div>
                    ))
                  }
                </ul>
              </div>
            ))}
           Tags:<ul> {course.tags.map((tag)=>(
              <li key={uuidv4()}>
                <h3>{tag}</h3>
              </li>
            ))}</ul>
          </div>
        </div>
      ))}
    </div>
  );

export default CourseComponent; 