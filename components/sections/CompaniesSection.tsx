import React from "react";
// import { Star } from "lucide-react";
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
  const [isPausedRow1, setIsPausedRow1] = React.useState(false);
  const [isPausedRow2, setIsPausedRow2] = React.useState(false);
  const [isPausedRow3, setIsPausedRow3] = React.useState(false);

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

  // Split companies into 3 rows
  const row1 = COMPANIES.slice(0, 5);
  const row2 = COMPANIES.slice(5, 10);
  const row3 = COMPANIES.slice(10, 14);

  // Duplicate for seamless scrolling
  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];
  const duplicatedRow3 = [...row3, ...row3, ...row3];

  const getCardWidth = () => 320; // Card width + gap

  interface CompanyCardProps {
    company: { name: string; image: string };
    index: number;
  }

  const CompanyCard: React.FC<CompanyCardProps> = ({ company, index }) => (
    <Card
      className="flex-shrink-0 w-72 transition-all duration-500 hover:scale-105 cursor-pointer"
      padding="lg"
    >
      <div className="h-20 sm:h-24 lg:h-28 flex items-center justify-center mb-3 sm:mb-4">
        <img
          src={company.image}
          alt={company.name}
          className="max-h-full max-w-full object-contain hover:brightness-110 transition-all duration-300"
        />
      </div>
    </Card>
  );

  return (
    <section
      id="companies"
      className="py-16 sm:py-20 lg:py-32 bg-gray-50"
      data-section="companies"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${row1.length * getCardWidth()}px);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-${row2.length * getCardWidth()}px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `,
        }}
      />

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
      </div>

      {/* Row 1: Right to Left */}
      <div
        className="relative overflow-hidden w-full select-none pt-2 sm:pt-4 pb-8 sm:pb-10"
        onMouseEnter={() => setIsPausedRow1(true)}
        onMouseLeave={() => setIsPausedRow1(false)}
      >
        <div
          className="flex gap-6"
          style={{
            animation: `scroll-left 40s linear infinite`,
            animationPlayState: isPausedRow1 ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {duplicatedRow1.map((company, index) => (
            <CompanyCard
              key={`row1-${index}`}
              company={company}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Left to Right */}
      <div
        className="relative overflow-hidden w-full select-none pb-8 sm:pb-10"
        onMouseEnter={() => setIsPausedRow2(true)}
        onMouseLeave={() => setIsPausedRow2(false)}
      >
        <div
          className="flex gap-6"
          style={{
            animation: `scroll-right 40s linear infinite`,
            animationPlayState: isPausedRow2 ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {duplicatedRow2.map((company, index) => (
            <CompanyCard
              key={`row2-${index}`}
              company={company}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Row 3: Right to Left */}
      <div
        className="relative overflow-hidden w-full select-none pb-12 sm:pb-16"
        onMouseEnter={() => setIsPausedRow3(true)}
        onMouseLeave={() => setIsPausedRow3(false)}
      >
        <div
          className="flex gap-6"
          style={{
            animation: `scroll-left 35s linear infinite`,
            animationPlayState: isPausedRow3 ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {duplicatedRow3.map((company, index) => (
            <CompanyCard
              key={`row3-${index}`}
              company={company}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
