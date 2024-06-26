
// import React, { useState } from "react";
import CompleteProject from "./completeProject";

interface ProjectPageProps {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  projectVideoUrl: string;
}

function extractVideoID(url:String) {
    let videoID = '';
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
        videoID = match[1];
    }
    return videoID;
}

const ProjectPage: React.FC<ProjectPageProps> = async ({params}:any) => {

    const GetProject = async () => {
        try {
          let res = await fetch(`http://localhost:3001/api/student/projects/${params.project}`, {
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

    const project = await GetProject();  
    console.log(project);
    const link = extractVideoID(project.youtubeLink);
//   const [photos, setPhotos] = useState<File[]>([]);

//   const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(event.target.files || []);
//     setPhotos(selectedFiles);
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Handle form submission, e.g. send photos to the server
//   };

return (

    <div className="flex flex-col  min-h-screen py-8 w-9/12 m-auto gap-24 ">
        <div className="shadow-md">
            <h1 className="text-2xl p-1  mb-4 text-white text-center bg-green-950 bg-opacity-90">
                {project.name}
            </h1>
            <p className="block font-light text-justify text-xl bg-green-950 bg-opacity-5 h-max leading-10 p-3  mx-auto">
                {project.description}
            </p>
        </div>
        <div className=" w-full h-[410px] flex shadow-sm">
            <iframe
                className="w-2/3 h-full "
                
                src={`https://www.youtube.com/embed/${link}?autoplay=0&mute=1`}
            ></iframe>
            <span className=" bg-green-950 text-3xl text-center text-white flex items-center bg-opacity-90 w-1/3 h-full ml-4">
                {" "}
                Experiment Demonstration
            </span>
        </div>

        <div className="w-2/4 m-auto  ">
           <CompleteProject/>
        </div>
    </div>
);
};

export default ProjectPage;
