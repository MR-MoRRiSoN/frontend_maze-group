import React from "react";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useServicesData } from "@/lib/data/servicec";
import { useTranslations } from "next-intl";
import hotelRoom1 from "@/assets/images/hotel_rooms/4A3R_RoomSet_carpet_LILY_991_GREY_10.jpg";
import hotelRoom2 from "@/assets/images/hotel_rooms/4A3V_RoomSet_carpet_ILDA_993_YELLOW_4.jpg";
import hotelRoom3 from "@/assets/images/hotel_rooms/4A3V_RoomSet_carpet_ILDA_995_RED_5.jpg";
import hotelRoom4 from "@/assets/images/hotel_rooms/4A3W_RoomSet_carpet_CESAR_600_BEIGE_2.jpg";

interface ServicesSectionProps {
  isVisible: boolean;
}

const HOTEL_ROOM_IMAGES = [
  hotelRoom1.src,
  hotelRoom2.src,
  hotelRoom3.src,
  hotelRoom4.src,
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  isVisible,
}) => {
  const t = useTranslations("services");
  const services = useServicesData();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  // Preload all images when component mounts
  React.useEffect(() => {
    const preloadImages = () => {
      let loadedCount = 0;
      HOTEL_ROOM_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === HOTEL_ROOM_IMAGES.length) {
            setImagesLoaded(true);
          }
        };
      });
    };

    preloadImages();
  }, []);

  React.useEffect(() => {
    if (hoveredIndex === 0) {
      // Index 0 is the first card (digitalSignage)
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % HOTEL_ROOM_IMAGES.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hoveredIndex]);

  return (
    <section
      id="services"
      className="py-16 md:py-24 lg:py-32 bg-gray-50 relative"
      data-section="services"
    >
      {/* Background image carousel - only show on hover */}
      {hoveredIndex === 0 && (
        <div className="absolute inset-0 z-0">
          {HOTEL_ROOM_IMAGES.map((img, imgIdx) => (
            <div
              key={imgIdx}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentImageIndex === imgIdx ? 1 : 0,
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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
            <div
              key={index}
              className="h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                className={`transition-all duration-500 h-full ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${
                  hoveredIndex === 0 && index !== 0
                    ? "!bg-white/50 opacity-50"
                    : ""
                }`}
                padding="lg"
                hoverable={false}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
