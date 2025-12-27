import React from "react";
import Image from "next/image";
// import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Images } from "@/components/constants";
import { useTranslations } from "next-intl";

interface CompaniesSectionProps {
  isVisible: boolean;
}

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
  { name: "Accor", image: Images.accor },
  { name: "Conrad", image: Images.conrad },
  { name: "Holiday Inn", image: Images.holidayInn },
  { name: "Hyatt", image: Images.hyatt },
  { name: "JW Marriott", image: Images.jwMarriott },
  { name: "Radisson", image: Images.radisson },
  { name: "Ritz-Carlton", image: Images.ritzCarlton },
  { name: "Sufta Sakhli", image: Images.suftaSakhli },
  { name: "W West", image: Images.wwest },
];

interface CompanyCardProps {
  company: { name: string; image: string };
  index: number;
}

const CompanyCard: React.FC<CompanyCardProps> = React.memo(({ company }) => (
  <Card
    className="flex-shrink-0 w-44 sm:w-56 lg:w-72 transition-all duration-500 hover:scale-105 cursor-pointer !shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] sm:!shadow-xl hover:!shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] sm:hover:!shadow-2xl"
    padding="lg"
  >
    <div className="relative h-24 sm:h-20 lg:h-28 flex items-center justify-center mb-0 sm:mb-3 lg:mb-4">
      <Image
        src={company.image}
        alt={`${company.name} - Maze Group hotel equipment and IT solutions partner`}
        fill
        className="object-contain hover:brightness-110 transition-all duration-300"
        sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 288px"
      />
    </div>
  </Card>
));

CompanyCard.displayName = "CompanyCard";

export const CompaniesSection: React.FC<CompaniesSectionProps> = ({
  isVisible,
}) => {
  const t = useTranslations();
  const [isPausedRow1, setIsPausedRow1] = React.useState(false);
  const [isPausedRow2, setIsPausedRow2] = React.useState(false);
  const [isPausedRow3, setIsPausedRow3] = React.useState(false);

  // Split companies into 3 rows
  const row1 = COMPANIES.slice(0, 5);
  const row2 = COMPANIES.slice(5, 10);
  const row3 = COMPANIES.slice(10, 14);

  // Duplicate 4 times to ensure seamless infinite scrolling with no gaps
  const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];
  const duplicatedRow3 = [...row3, ...row3, ...row3, ...row3];

  return (
    <section
      id="companies"
      className="py-16 sm:py-20 lg:py-32 bg-gray-50"
      data-section="companies"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll-left-row1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-11rem * ${row1.length} - 0.75rem * ${row1.length}));
          }
        }
        @keyframes scroll-right-row2 {
          0% {
            transform: translateX(calc(-11rem * ${row2.length} - 0.75rem * ${row2.length}));
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes scroll-left-row3 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-11rem * ${row3.length} - 0.75rem * ${row3.length}));
          }
        }

        .scroll-animation-row1 {
          animation: scroll-left-row1 25s linear infinite;
        }
        .scroll-animation-row2 {
          animation: scroll-right-row2 25s linear infinite;
        }
        .scroll-animation-row3 {
          animation: scroll-left-row3 22s linear infinite;
        }

        @media (min-width: 640px) {
          @keyframes scroll-left-row1-sm {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-14rem * ${row1.length} - 1rem * ${row1.length}));
            }
          }
          @keyframes scroll-right-row2-sm {
            0% {
              transform: translateX(calc(-14rem * ${row2.length} - 1rem * ${row2.length}));
            }
            100% {
              transform: translateX(0);
            }
          }
          @keyframes scroll-left-row3-sm {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-14rem * ${row3.length} - 1rem * ${row3.length}));
            }
          }

          .scroll-animation-row1 {
            animation: scroll-left-row1-sm 35s linear infinite;
          }
          .scroll-animation-row2 {
            animation: scroll-right-row2-sm 35s linear infinite;
          }
          .scroll-animation-row3 {
            animation: scroll-left-row3-sm 30s linear infinite;
          }
        }

        @media (min-width: 1024px) {
          @keyframes scroll-left-row1-lg {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-18rem * ${row1.length} - 1.5rem * ${row1.length}));
            }
          }
          @keyframes scroll-right-row2-lg {
            0% {
              transform: translateX(calc(-18rem * ${row2.length} - 1.5rem * ${row2.length}));
            }
            100% {
              transform: translateX(0);
            }
          }
          @keyframes scroll-left-row3-lg {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-18rem * ${row3.length} - 1.5rem * ${row3.length}));
            }
          }

          .scroll-animation-row1 {
            animation: scroll-left-row1-lg 40s linear infinite;
          }
          .scroll-animation-row2 {
            animation: scroll-right-row2-lg 40s linear infinite;
          }
          .scroll-animation-row3 {
            animation: scroll-left-row3-lg 35s linear infinite;
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
        className="relative overflow-hidden w-full select-none pb-4 sm:pb-8 lg:pb-10"
        onMouseEnter={() => setIsPausedRow1(true)}
        onMouseLeave={() => setIsPausedRow1(false)}
      >
        <div
          className="flex gap-3 sm:gap-4 lg:gap-6 scroll-animation-row1"
          style={{
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
        className="relative overflow-hidden w-full select-none pb-4 sm:pb-8 lg:pb-10"
        onMouseEnter={() => setIsPausedRow2(true)}
        onMouseLeave={() => setIsPausedRow2(false)}
      >
        <div
          className="flex gap-3 sm:gap-4 lg:gap-6 scroll-animation-row2"
          style={{
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
        className="relative overflow-hidden w-full select-none pb-3 sm:pb-12 lg:pb-16"
        onMouseEnter={() => setIsPausedRow3(true)}
        onMouseLeave={() => setIsPausedRow3(false)}
      >
        <div
          className="flex gap-3 sm:gap-4 lg:gap-6 scroll-animation-row3"
          style={{
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
