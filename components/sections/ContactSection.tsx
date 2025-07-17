import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

interface ContactSectionProps {
  isVisible: boolean;
  onStartProject: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isVisible,
  onStartProject,
}) => {
  const t = useTranslations();

  const contactInfo = [
    {
      icon: (
        <Phone className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white mx-auto mb-4 sm:mb-6" />
      ),
      title: t("contact.phone.title"),
      details: [t("contact.phone.number1"), t("contact.phone.number2")],
      subtitle: t("contact.phone.subtitle"),
    },
    {
      icon: (
        <Mail className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white mx-auto mb-4 sm:mb-6" />
      ),
      title: t("contact.email.title"),
      details: [t("contact.email.address1"), t("contact.email.address2")],
      subtitle: t("contact.email.subtitle"),
    },
    {
      icon: (
        <MapPin className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white mx-auto mb-4 sm:mb-6" />
      ),
      title: t("contact.office.title"),
      details: [t("contact.office.location1"), t("contact.office.location2")],
      subtitle: t("contact.office.subtitle"),
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-r from-[#032685] to-[#021d5a]"
      data-section="contact"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div
          className={`text-center mb-12 sm:mb-14 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8">
            {t("contact.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#b3d1ff] max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-4">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 h-full">
                {info.icon}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {info.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="text-white text-sm sm:text-base lg:text-lg xl:text-xl font-semibold break-words"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
                <p className="text-[#b3d1ff] mt-3 sm:mt-4 text-sm sm:text-base">
                  {info.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`text-center mt-12 sm:mt-14 lg:mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ animationDelay: "600ms" }}
        >
          <Button
            variant="secondary"
            size="xl"
            onClick={onStartProject}
            className="shadow-2xl w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-12 py-3 sm:py-4"
          >
            {t("contact.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};
