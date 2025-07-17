import React from "react";
import { projects } from "@/lib/data/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface ProjectDetailProps {
  params: Promise<{
    id: string;
  }>;
}

// Server-side function to generate static params
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  // Unwrap the params Promise
  const { id } = await params;

  // Find the project by ID
  const project = projects.find((p) => p.id === parseInt(id));

  // Pass the project data to the client component
  return <ProjectDetailClient project={project} projectId={id} />;
}
