import ProjectCard from "@/components/core/ProjectCard";
import data from "../../../public/json/projects.json"; // Get data from CMS
import { Project } from "@/types/globals";

export default function ProjectsTab() {
  let projects: Project[] = data;

  return (
    <div className="prose space-y-8 py-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="w-[100px] rounded-lg bg-gradient-to-tr from-pink-600 via-pink-500 to-fuchsia-400 px-7 py-1"></div>
      </div>

      <div className="flex flex-wrap gap-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            type={project.type}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            url={project.url}
          />
        ))}
      </div>
    </div>
  );
}
