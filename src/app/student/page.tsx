import ProjectCards from "./projectCards";
const StudentPage = () => {

  return (
    <div className="flex flex-col flex-wrap align-middle w-7/12 m-auto text-center py-10">
      <h1 className="font-light underline underline-offset-8 text-2xl">
        My Projects
      </h1>
      <div className="pt-8 flex flex-col items-center gap-9">
        <ProjectCards />
      </div>
    </div>
  );
};
export default StudentPage;
