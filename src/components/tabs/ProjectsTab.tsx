import ProjectCard from "../core/ProjectCard";
import data from "../../../public/json/projects.json"
import { Project } from "@/types/globals";


export default function ProjectsTab() {

    let projects: Project[] = data;

    return (
        <div className="py-4 prose space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Projects</h1>
                <div className="px-7 py-1 bg-gradient-to-tr from-pink-600 to-amber-500 w-[100px] rounded-lg"></div>
            </div>

            <div className="flex gap-4">
                {projects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} techStack={project.techStack} url={project.url} />)}
            </div>
        </div>
    )
}