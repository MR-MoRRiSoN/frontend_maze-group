import React from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Images } from "@/components/constants";
import { useTranslations } from "next-intl";

interface CompaniesSectionProps {
  isVisible: boolean;
}

export const CompaniesSection: React.FC<CompaniesSectionProps> = ({
  isVisible,
}) => {
  const t = useTranslations();

  const COMPANIES = [
    { name: "Silk Road Group", image: Images.SilkRoadGroup },
    { name: "Wyndham", image: Images.WHYNDHAM },
    { name: "Ministry of Georgia", image: Images.MinistryOfGeorgia },
    { name: "GT Group", image: Images.gtGroup },
    { name: "Swiss Hotel", image: Images.swissHotel },
    { name: "Sheraton", image: Images.sheraton },
    { name: "LIBS", image: Images.libs },
    { name: "Lopota", image: Images.lopota },
    { name: "Marriott", image: Images.marriott },
    { name: "Tour Invest Group", image: Images.tourinvestgroup },
    { name: "GCF", image: Images.gcf },
    { name: "Hilton", image: Images.hilton },
    { name: "Mövenpick", image: Images.movenpick },
    { name: "LW", image: Images.LW },
  ];

  return (
    <section
      id="companies"
      className="py-16 sm:py-20 lg:py-32 bg-gray-50"
      data-section="companies"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t("companies.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-4xl mx-auto px-4">
            {t("companies.subtitle")}
          </p>
        </div>

        {/* Layout: Keep original for medium+ screens, make responsive for small screens */}
        <div className="relative select-none">
          {/* Original animation keyframes */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            @keyframes pulse-glow {
              0%,
              100% {
                box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
              }
              50% {
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
              }
            }
            @keyframes slide-in-left {
              0% {
                transform: translateX(-100px);
                opacity: 0;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }
            @keyframes slide-in-right {
              0% {
                transform: translateX(100px);
                opacity: 0;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }
            @keyframes slide-in-up {
              0% {
                transform: translateY(100px);
                opacity: 0;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animate-pulse-glow {
              animation: pulse-glow 3s ease-in-out infinite;
            }
            .animate-slide-in-left {
              animation: slide-in-left 0.8s ease-out forwards;
            }
            .animate-slide-in-right {
              animation: slide-in-right 0.8s ease-out forwards;
            }
            .animate-slide-in-up {
              animation: slide-in-up 0.8s ease-out forwards;
            }
          `}</style>

          {/* Mobile: Single column with more spacing */}
          <div className="block sm:hidden">
            <div className="space-y-8">
              {COMPANIES.map((company, index) => (
                <Card
                  key={index}
                  className={`text-center transition-all duration-500 hover:transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-200 group min-h-[200px] ${
                    isVisible ? "opacity-100 animate-slide-in-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationDuration: "0.8s",
                  }}
                  padding="lg"
                >
                  <div className="h-24 flex items-center justify-center mb-8 relative">
                    <div
                      className="animate-float"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">
                    {t("companies.labels.trustedPartner")}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Original layout for medium+ screens */}
          <div className="hidden sm:block">
            {/* First Row - 3 companies centered */}
            <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 mb-8">
              {COMPANIES.slice(0, 3).map((company, index) => (
                <Card
                  key={index}
                  className={`text-center transition-all duration-500 hover:transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-200 group ${
                    isVisible ? "opacity-100 animate-slide-in-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationDuration: "0.8s",
                  }}
                  padding="lg"
                >
                  <div className="h-20 sm:h-24 lg:h-28 flex items-center justify-center mb-3 sm:mb-4 relative">
                    <div
                      className="animate-float"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">
                    {t("companies.labels.premiumPartnership")}
                  </p> */}
                </Card>
              ))}
            </div>

            {/* Second Row - 4 companies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
              {COMPANIES.slice(3, 7).map((company, index) => (
                <Card
                  key={index + 3}
                  className={`text-center transition-all duration-500 hover:transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-200 group ${
                    isVisible
                      ? "opacity-100 animate-slide-in-left"
                      : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${(index + 3) * 150}ms`,
                    animationDuration: "0.8s",
                  }}
                  padding="lg"
                >
                  <div className="h-20 sm:h-24 lg:h-28 flex items-center justify-center mb-3 sm:mb-4 relative">
                    <div
                      className="animate-float"
                      style={{ animationDelay: `${(index + 3) * 0.7}s` }}
                    >
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-semibold group-hover:text-purple-600 transition-colors duration-300">
                    {t("companies.labels.globalExcellence")}
                  </p> */}
                </Card>
              ))}
            </div>

            {/* Third Row - 4 companies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
              {COMPANIES.slice(7, 11).map((company, index) => (
                <Card
                  key={index + 7}
                  className={`text-center transition-all duration-500 hover:transform hover:scale-110 hover:shadow-2xl hover:shadow-green-200 group ${
                    isVisible
                      ? "opacity-100 animate-slide-in-right"
                      : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${(index + 7) * 150}ms`,
                    animationDuration: "0.8s",
                  }}
                  padding="lg"
                >
                  <div className="h-20 sm:h-24 lg:h-28 flex items-center justify-center mb-3 sm:mb-4 relative">
                    <div
                      className="animate-float"
                      style={{ animationDelay: `${(index + 7) * 0.9}s` }}
                    >
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-semibold group-hover:text-green-600 transition-colors duration-300">
                    {t("companies.labels.industryLeader")}
                  </p> */}
                </Card>
              ))}
            </div>

            {/* Fourth Row - 3 companies centered */}
            <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8">
              {COMPANIES.slice(11, 14).map((company, index) => (
                <Card
                  key={index + 11}
                  className={`text-center transition-all duration-500 hover:transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-200 group ${
                    isVisible ? "opacity-100 animate-slide-in-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${(index + 11) * 200}ms`,
                    animationDuration: "0.8s",
                  }}
                  padding="lg"
                >
                  <div className="h-20 sm:h-24 lg:h-28 flex items-center justify-center mb-3 sm:mb-4 relative">
                    <div
                      className="animate-float"
                      style={{ animationDelay: `${(index + 11) * 1.1}s` }}
                    >
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-semibold group-hover:text-orange-600 transition-colors duration-300">
                    {t("companies.labels.strategicAlliance")}
                  </p> */}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
