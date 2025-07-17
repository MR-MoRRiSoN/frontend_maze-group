import React from "react";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useServicesData } from "@/lib/data/servicec";
import { useTranslations } from "next-intl";

interface ServicesSectionProps {
  isVisible: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  isVisible,
}) => {
  const t = useTranslations("services");
  const services = useServicesData();

  return (
    <section
      id="services"
      className="py-16 md:py-24 lg:py-32 bg-gray-50"
      data-section="services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              //  style={{ animationDelay: `${index * 200}ms` }}
              padding="lg"
            >
              <div className="mb-6 md:mb-8">{service.icon}</div>
              <h3 className="font-bold text-gray-900 text-xl md:text-2xl mb-4 md:mb-6">
                {service.title}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-base md:text-lg">
                    {t("keyFeatures")}
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-600 text-sm md:text-base"
                      >
                        <ChevronRight className="w-4 h-4 text-[#032685] mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-base md:text-lg">
                    {t("benefits")}
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-600 text-sm md:text-base"
                      >
                        <ChevronRight className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
