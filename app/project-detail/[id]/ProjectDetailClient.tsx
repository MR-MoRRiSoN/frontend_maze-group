"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { useWhatsApp } from "@/lib/hooks/useWhatsApp";
import { Project } from "@/types/project"; // Assuming you have this type

interface ProjectDetailClientProps {
  project: Project | undefined;
  projectId: string;
}

export function ProjectDetailClient({
  project,
  projectId,
}: ProjectDetailClientProps) {
  const router = useRouter();
  const whatsapp = useWhatsApp();

  // Handle case where project is not found
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The project you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#032685] text-white px-6 py-3 rounded-lg hover:bg-[#021d5a] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleContact = (projectName: string, client: string) => {
    // whatsapp.setProjectMessage(projectName, client);
    router.push("/#contact");
  };

  const handleSectionClick = (sectionId: string) => {
    router.push(`/#${sectionId}`);
  };

  return (
    <ProjectDetailPage
      project={project}
      onBack={handleBack}
      onContact={handleContact}
      onSectionClick={handleSectionClick}
    />
  );
}
