import React from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "../../ui/Card";
import { Project } from "../../../types/project";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  animationDelay?: number;
  className: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
  animationDelay = 0,
  className,
}) => {
  return (
    <Card
      className={`${className} cursor-pointer overflow-hidden opacity-100 translate-y-0 select-none`}
      //   style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div>
        <div className="relative">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-64 object-cover rounded-2xl"
          />
          <div className="absolute top-4 right-4">
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
              style={{ cursor: "pointer" }}
              onClick={() => {
                onViewDetails(project);
              }}
              className="text-[#032685] hover:text-[#021d5a] font-bold flex items-center text-lg"
            >
              View Details <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
