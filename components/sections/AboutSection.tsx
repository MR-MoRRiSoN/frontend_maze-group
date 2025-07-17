import React from "react";
import { Star, Users, Award, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

interface AboutSectionProps {
  isVisible: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isVisible }) => {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-32 bg-gray-50"
      data-section="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-8 sm:mb-12 lg:mb-16">
            {t("title")}
          </h2>
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-2xl p-6 sm:p-8 lg:p-16 transform hover:scale-105 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-left order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 lg:mb-6">
                  {t("missionTitle")}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-6 lg:mb-8 leading-relaxed">
                  {t("missionDescription1")}
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed">
                  {t("missionDescription2")}
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div className="bg-[#e6f2ff] rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#032685] mx-auto mb-2 lg:mb-3" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#032685]">
                      15+
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-semibold">
                      {t("yearsExperience")}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
                    <Globe className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600 mx-auto mb-2 lg:mb-3" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                      5+
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-semibold">
                      {t("countriesServed")}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600 mx-auto mb-2 lg:mb-3" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                      50+
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-semibold">
                      {t("expertTeam")}
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
                    <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-600 mx-auto mb-2 lg:mb-3" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
                      A+
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-semibold">
                      {t("qualityRating")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
