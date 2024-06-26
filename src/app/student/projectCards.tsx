import Image from "next/image";
import image1 from "/src/app/student/project/image1.jpg";
import { ObjectId } from "mongodb";
import Link from "next/link";
const GetProjects = async () => {
  try {
    let res = await fetch("/api/student/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });
    return await res.json();
  } catch {
    console.log("An error occurred while fetching the projects.");
  }
};

const ProjectCards = async () => {
  let projects: ProjectCardData[] = await GetProjects();
  let projectCards = projects.map((project, index) => {
    return (
      <Link key={project._id} className="w-full" href={`/student/${project._id}`}>
        <div className="w-full  h-[200px] flex transform  transition-transform  cursor-pointer duration-1000 hover:scale-105 bg-green-900 bg-opacity-5 hover:bg-opacity-20">
          <div className="w-1/3 relative">
            <Image
              src={project.imageFile}
              alt="Project Image"
              
              fill
            />
          </div>

          <div className=" p-4  w-2/3 relative flex flex-col items-start ">
            <div className=" -top-3 right-1 absolute flex items-center justify-center bg-green-900 rounded-full h-10 w-10 text-white font-bold text-sm">
              {index + 1}
            </div>
            <h1 className="font-mono text-2xl ">{project.name}</h1>
            <p className=" text-sm text-justify mt-4 overflow-hidden">
              {project.overview}
            </p>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 absolute bottom-1 right-1">
              Due in {Math.round(Math.random() * 10 + 1)} days
            </span>
          </div>
        </div>
      </Link>
    );
  });

  return projectCards;
};

export default ProjectCards;

type ProjectCardData = {
  _id: string;
  name: string;
  overview: string;
  youtubeLink: string;
  date: { from: Date; to: Date };
  imageFile: File;
};
