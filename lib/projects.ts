export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  fullDescription: string;
}

export const projects: Project[] = [
  {
    slug: "ux-system-redesign",
    title: "UX System Redesign",
    description:
      "Redesigned an internal system with a focus on usability, clarity, and smoother workflows as part of a UX design program.",
    image: "/project-ux.jpg",
    tags: ["UX Design", "Research", "Usability"],
    fullDescription:
      "This page will later include the full case study, process, challenges, decisions, images, and final outcomes of the project.",
  },
  {
    slug: "python-data-projects",
    title: "Python & Data Projects",
    description:
      "Built projects involving Python, analysis, statistics, and structured problem solving through academic and self-learning work.",
    image: "/project-python.jpg",
    tags: ["Python", "Data Analysis", "Statistics"],
    fullDescription:
      "This page will later include project details, code highlights, analysis steps, visuals, and insights.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}