import React, { useCallback, useMemo } from "react";
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

  const handleViewAllProjects = useCallback(() => {
    router.push("/all-projects");
  }, [router]);

  const renderProjectCard = useCallback((
    project: Project,
    _index: number,
    _isVisible: boolean,
    animationDelay: number
  ) => {
    return (
      <ProjectCard
        project={project}
        onViewDetails={onProjectView}
        animationDelay={animationDelay}
        className="h-full"
      />
    );
  }, [onProjectView]);

  const gradientColors = useMemo(() => ({ from: "from-gray-50", to: "to-transparent" }), []);

  const primaryButton = useMemo(() => ({
    text: t("startYourProject"),
    onClick: onStartProject,
  }), [t, onStartProject]);

  const secondaryButton = useMemo(() => ({
    text: t("seeAllProjects"),
    onClick: handleViewAllProjects,
  }), [t, handleViewAllProjects]);

  const seeAllCard = useMemo(() => ({
    enabled: true,
    title: t("seeAllProjects"),
    subtitle: t("exploreAllProjects"),
    onClick: handleViewAllProjects,
  }), [t, handleViewAllProjects]);

  return (
    <ScrollableCardsSection
      id="projects"
      title={t("featuredProjects")}
      subtitle={t("showcaseSubtitle")}
      items={projects}
      isVisible={isVisible}
      backgroundColor="bg-gray-50"
      gradientColors={gradientColors}
      minHeight="400px"
      renderCard={renderProjectCard}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      seeAllCard={seeAllCard}
    />
  );
};
