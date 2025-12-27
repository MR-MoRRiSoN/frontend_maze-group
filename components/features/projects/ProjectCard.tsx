import React, { useCallback } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "../../ui/Card";
import { Project } from "../../../types/project";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  animationDelay?: number;
  className: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(
  ({ project, onViewDetails, animationDelay = 0, className }) => {
    const handleClick = useCallback(() => {
      onViewDetails(project);
    }, [onViewDetails, project]);

    return (
      <Card
        className={`${className} cursor-pointer overflow-hidden opacity-100 translate-y-0 select-none`}
        //   style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div>
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.name} - ${project.category} project for ${project.client}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-[#032685] text-white px-3 py-1 rounded-full font-semibold text-sm">
                {project.category}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-gray-900 text-xl mb-2">
              {project.name}
            </h3>
            <p className="text-[#032685] font-bold text-lg mb-4">
              {project.client}
            </p>
            <p className="text-gray-600 mb-6">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-[#032685] font-semibold">
                {project.timeline}
              </span>
              <button
                type="button"
                onClick={handleClick}
                className="text-[#032685] hover:text-[#021d5a] font-bold flex items-center text-lg"
                aria-label={`View details for ${project.name}`}
              >
                View Details <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
