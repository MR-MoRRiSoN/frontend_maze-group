import React from "react";
import { useRouter } from "next/navigation";
import { ScrollableCardsSection } from "./ScrollableCardsSectionProps";
import { ProjectCard } from "@/components/features/projects/ProjectCard";
import { Project } from "@/types/project";
import { useTranslations } from "next-intl";

interface ProjectsSectionProps {
  projects: Project[];
  isVisible: boolean;
  onProjectView: (project: Project) => void;
  onStartProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isVisible,
  onProjectView,
  onStartProject,
}) => {
  const router = useRouter();
  const t = useTranslations("projects");

  const handleViewAllProjects = () => {
    router.push("/all-projects");
  };

  const renderProjectCard = (
    project: Project,
    index: number,
    isVisible: boolean,
    animationDelay: number
  ) => (
    <ProjectCard
      project={project}
      onViewDetails={onProjectView}
      animationDelay={animationDelay}
      className="h-full"
    />
  );

  return (
    <ScrollableCardsSection
      id="projects"
      title={t("featuredProjects")}
      subtitle={t("showcaseSubtitle")}
      items={projects}
      isVisible={isVisible}
      backgroundColor="bg-gray-50"
      gradientColors={{ from: "from-gray-50", to: "to-transparent" }}
      minHeight="400px"
      renderCard={renderProjectCard}
      primaryButton={{
        text: t("startYourProject"),
        onClick: onStartProject,
      }}
      secondaryButton={{
        text: t("seeAllProjects"),
        onClick: handleViewAllProjects,
      }}
    />
  );
};
