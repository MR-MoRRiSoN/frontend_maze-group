import React from "react";
import { getProjectsByLocale } from "@/lib/data/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { getLocale } from "next-intl/server";

interface ProjectDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  // Unwrap the params Promise
  const { id } = await params;
  const locale = await getLocale();
  const projects = getProjectsByLocale(locale);

  // Find the project by ID
  const project = projects.find((p) => p.id === parseInt(id));

  // Pass the project data to the client component
  return <ProjectDetailClient project={project} projectId={id} />;
}
