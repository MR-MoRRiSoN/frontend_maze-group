// lib/data/projects.ts
import { Project } from "@/types/project";

// Import all language versions
import enProjects from "@/json/made_projects/en.json";
import geProjects from "@/json/made_projects/ge.json";
import ruProjects from "@/json/made_projects/ru.json";

// Create a mapping of locale to projects
const projectsMap: Record<string, Project[]> = {
  en: enProjects as Project[],
  ge: geProjects as Project[],
  ru: ruProjects as Project[],
};

// Function to get projects by locale
export const getProjectsByLocale = (locale: string): Project[] => {
  return projectsMap[locale] || projectsMap.en; // fallback to English
};

// Default export for backward compatibility
export const projects: Project[] = enProjects as Project[];
