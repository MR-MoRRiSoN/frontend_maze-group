import React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  onAboutClick: () => void;
  onProjectsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAboutClick,
  onProjectsClick,
}) => {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#e6f2ff] via-white to-[#e6f2ff] min-h-dvh overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#032685]/5 to-transparent"></div>
        {/* Responsive floating elements */}
        <div className="absolute top-10 left-4 w-32 h-32 sm:top-16 sm:left-8 sm:w-48 sm:h-48 lg:top-20 lg:left-20 lg:w-72 lg:h-72 bg-[#6b93ff]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-4 w-40 h-40 sm:bottom-16 sm:right-8 sm:w-64 sm:h-64 lg:bottom-20 lg:right-20 lg:w-96 lg:h-96 bg-[#4d7cff]/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-dvh px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:max-w-none lg:mx-0 lg:absolute lg:top-1/2 lg:left-20 lg:transform lg:-translate-y-1/2 xl:left-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            {t("title")}
          </h1>
          <hr className="my-6 sm:my-8 border-t border-gray-300 mx-auto lg:mx-0 w-24 sm:w-full" />
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-5xl mx-auto lg:mx-0">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 sm:space-y-0 justify-center lg:justify-start">
            <Button
              onClick={onAboutClick}
              className="text-base w-full sm:w-auto"
            >
              {t("discoverStory")}
            </Button>
            <Button
              variant="outline"
              onClick={onProjectsClick}
              className="text-base w-full sm:w-auto"
            >
              {t("discoverWork")}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-[#032685]" />
      </div>
    </section>
  );
};
