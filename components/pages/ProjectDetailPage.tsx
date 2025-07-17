// components/pages/ProjectDetailPage.tsx
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Target,
  Users,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useImageCarousel } from "@/lib/hooks/useImageCarousel";
import { Project } from "@/types/project";

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onContact: (projectName: string, client: string) => void;
  onSectionClick: (sectionId: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onContact,
  onSectionClick,
}) => {
  const {
    currentImageIndex,
    isPlaying,
    setIsPlaying,
    nextImage,
    prevImage,
    goToImage,
  } = useImageCarousel(project.images, true); // Auto-scroll enabled by default

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "Escape":
          setIsModalOpen(false);
          break;
        case "ArrowLeft":
          setModalImageIndex((prev) =>
            prev === 0 ? project.images.length - 1 : prev - 1
          );
          break;
        case "ArrowRight":
          setModalImageIndex((prev) =>
            prev === project.images.length - 1 ? 0 : prev + 1
          );
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, project.images.length]);

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-12">
          {/* Header */}
          <div className="flex items-center mb-6 md:mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-[#032685] hover:text-[#021d5a] font-semibold text-base md:text-lg mr-4 md:mr-6"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="hidden sm:inline">Back to Projects</span>
              <span className="sm:hidden">Back</span>
            </button>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="ml-4 md:ml-6 text-gray-600 text-sm md:text-base hidden sm:inline">
              Project Details
            </span>
          </div>

          {/* Project Header */}
          <Card className="overflow-hidden mb-8 md:mb-12" padding="sm">
            <div className="relative h-64 sm:h-80 md:h-96">
              <img
                src={project.images[currentImageIndex]}
                alt={project.name}
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(currentImageIndex)}
              />

              {/* Image Controls */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center space-x-2 md:space-x-4 bg-black/50 rounded-full px-3 py-2 md:px-4 md:py-2">
                <button
                  onClick={prevImage}
                  className="text-white hover:text-[#6b93ff] transition-colors"
                >
                  <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-[#6b93ff] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Play className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
                <button
                  onClick={nextImage}
                  className="text-white hover:text-[#6b93ff] transition-colors"
                >
                  <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <span className="text-white text-xs md:text-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </span>
              </div>

              {/* Project Category Badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <span className="bg-[#032685] text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-lg">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {project.name}
                  </h1>
                  <p className="text-[#032685] font-bold text-lg md:text-xl lg:text-2xl mb-6">
                    {project.client}
                  </p>
                  <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      Project Overview
                    </h3>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {project.details}
                    </p>
                  </div>

                  {/* Technologies Used */}
                  <div className="mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      Technologies Implemented
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-[#e6f2ff] text-[#032685] px-3 py-1 md:px-4 md:py-2 rounded-full font-semibold text-sm md:text-base"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-red-50 rounded-2xl p-6">
                      <h4 className="text-lg md:text-xl font-bold text-red-800 mb-3">
                        Challenges
                      </h4>
                      <p className="text-red-700 text-sm md:text-base">
                        {project.challenges}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6">
                      <h4 className="text-lg md:text-xl font-bold text-green-800 mb-3">
                        Solutions
                      </h4>
                      <p className="text-green-700 text-sm md:text-base">
                        {project.solutions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="order-first lg:order-last">
                  <div className="bg-[#e6f2ff] rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-[#032685] mb-6">
                      Project Stats
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#032685] mr-2" />
                          <span className="font-semibold text-gray-700 text-sm md:text-base">
                            Timeline
                          </span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-[#032685]">
                          {project.timeline}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <Target className="w-4 h-4 md:w-5 md:h-5 text-[#032685] mr-2" />
                          <span className="font-semibold text-gray-700 text-sm md:text-base">
                            Budget
                          </span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-[#032685]">
                          {project.budget}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <Users className="w-4 h-4 md:w-5 md:h-5 text-[#032685] mr-2" />
                          <span className="font-semibold text-gray-700 text-sm md:text-base">
                            Team Size
                          </span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-[#032685]">
                          {project.teamSize}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-green-50 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-green-900 mb-4">
                      Results Achieved
                    </h3>
                    <p className="text-green-700 leading-relaxed text-sm md:text-base">
                      {project.results}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6">
                <Button
                  size="lg"
                  className="flex-1 w-full sm:w-auto"
                  onClick={() => onContact(project.name, project.client)}
                >
                  Get Similar Project Quote
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 w-full sm:w-auto"
                  onClick={() => onSectionClick("contact")}
                >
                  Contact Our Team
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enhanced Image Modal - Matching ProductDetailPage Style */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            {project.images.length > 1 && (
              <button
                onClick={prevModalImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {project.images.length > 1 && (
              <button
                onClick={nextModalImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Modal Image */}
            <img
              src={project.images[modalImageIndex]}
              alt={project.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Image Counter */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {modalImageIndex + 1} / {project.images.length}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {project.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setModalImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                      index === modalImageIndex ? "ring-2 ring-white" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
