export type Project = {
  url: string;
  type: string;
  title: string;
  description: string;
  techStack: Technology[];
};

export type Technology = {
  icon: string;
  name: string;
  color: string;
};
