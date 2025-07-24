"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Navigation } from "@/components/layout/Navigation";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { WhatsAppCard } from "@/components/features/contact/WhatsAppCard";
import { Card } from "@/components/ui/Card";
import { ProjectCard } from "@/components/features/projects/ProjectCard";
import { Project } from "@/types/project";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { useWhatsApp } from "@/lib/hooks/useWhatsApp";
import { getProjectsByLocale } from "@/lib/data/projects";
import { projects } from "../../lib/data/projects";

export default function AllProjectsPage() {
  const router = useRouter();
  const t = useTranslations();
  const [isLoaded, setIsLoaded] = useState(false);
  const isVisible = useIntersectionObserver();
  const whatsapp = useWhatsApp();
  const locale = useLocale();
  const projects = useMemo(() => getProjectsByLocale(locale), [locale]);

  useEffect(() => {
    // Trigger initial animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleBackToHome = () => {
    router.back();
  };

  const handleSectionClick = (sectionId: string) => {
    // Navigate to home page and scroll to section
    console.log("CLICKKK");
    router.push(`/#${sectionId}`);
  };

  const handleProjectView = (project: Project) => {
    router.push(`/project-detail/${project.id}`);
  };

  const handleQuoteClick = () => {
    whatsapp.setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation onSectionClick={handleSectionClick} />

      <div className="pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl py-6 sm:py-8 md:py-12">
          {/* Header with Animation - Responsive */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={handleBackToHome}
              className="flex items-center justify-start text-[#032685] hover:text-[#021d5a] active:text-[#021d5a] font-semibold text-base sm:text-lg mb-3 sm:mb-0 sm:mr-6 transition-colors duration-300 min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {t("allProjects.backToHome")}
              </span>
            </button>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="text-gray-600 text-sm sm:text-base sm:ml-6 self-start sm:self-center">
              {t("allProjects.breadcrumb")}
            </span>
          </div>

          {/* Page Title with Animation - Responsive */}
          <div
            className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            data-section="projects-header"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              {t("allProjects.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed">
              {t("allProjects.subtitle")}
            </p>
          </div>

          {/* Projects Grid with Staggered Animation - Responsive */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-12 md:mb-16"
            data-section="projects-grid"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-1000 ${
                  isVisible["projects-grid"] || isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  animationDelay: `${index * 100 + 400}ms`,
                  transitionDelay: `${index * 100 + 400}ms`,
                }}
              >
                <ProjectCard
                  project={project}
                  onViewDetails={handleProjectView}
                  animationDelay={index * 100}
                  className={""}
                />
              </div>
            ))}
          </div>

          {/* Stats with Animation - Responsive */}
          <div
            className={`transition-all duration-1000 ${
              isVisible["projects-stats"] || isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "600ms" }}
            data-section="projects-stats"
          >
            <Card className="text-center" padding="lg">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
                {t("allProjects.stats.title")}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                <div
                  className={`transition-all duration-1000 ${
                    isVisible["projects-stats"] || isLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#032685] mb-1 sm:mb-2">
                    {projects.length}+
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
                    {t("allProjects.stats.totalProjects")}
                  </div>
                </div>
                <div
                  className={`transition-all duration-1000 ${
                    isVisible["projects-stats"] || isLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: "900ms" }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#032685] mb-1 sm:mb-2">
                    100%
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
                    {t("allProjects.stats.successRate")}
                  </div>
                </div>
                <div
                  className={`transition-all duration-1000 ${
                    isVisible["projects-stats"] || isLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: "1000ms" }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#032685] mb-1 sm:mb-2">
                    50+
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
                    {t("allProjects.stats.happyClients")}
                  </div>
                </div>
                <div
                  className={`transition-all duration-1000 ${
                    isVisible["projects-stats"] || isLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: "1100ms" }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#032685] mb-1 sm:mb-2">
                    5+
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
                    {t("allProjects.stats.countries")}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* WhatsApp Components */}
      <WhatsAppButton onClick={() => whatsapp.setIsOpen(!whatsapp.isOpen)} />

      <WhatsAppCard
        isOpen={whatsapp.isOpen}
        selectedPhone={whatsapp.selectedPhone}
        setSelectedPhone={whatsapp.setSelectedPhone}
        message={whatsapp.message}
        setMessage={whatsapp.setMessage}
        onSend={whatsapp.sendMessage}
        onClose={() => whatsapp.setIsOpen(false)}
      />
    </div>
  );
}
