import { Card } from "@/components/ui/Card";
import { Technology } from "@/types/globals";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  url: string;
  title: string;
  description: string;
  techStack: Technology[];
}

export default function ProjectCard({
  url,
  title,
  description,
  techStack,
}: ProjectCardProps) {
  return (
    <Card className="grid w-full max-w-md gap-6 p-6">
      <div className="flex items-center gap-4">
        <div className="flex aspect-square w-12 items-center justify-center rounded-md bg-zinc-950 dark:bg-zinc-100">
          <CodeIcon className="h-6 w-6 text-zinc-100 dark:text-zinc-950" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="text-muted-foreground">{description}</div>
      <div className="grid gap-2">
        <div className="font-semibold">Technologies Used:</div>
        <ul>
          {techStack.map((technology, index) => (
            <li
              key={`${technology.name}-${index}`}
              className="flex items-center gap-2"
            >
              <i
                className={technology.icon}
                style={{ color: technology.color }}
              />{" "}
              {technology.name}
            </li>
          ))}
        </ul>
      </div>

      <a href={url} target="_blank" className="mt-auto">
        <Button variant="outline" className="w-full">
          View Project
        </Button>
      </a>
    </Card>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
