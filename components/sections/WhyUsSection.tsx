import React, { useState, useEffect, useRef } from "react";
import { Users, Building, Star, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

interface WhyUsSectionProps {
  isVisible: boolean;
}

// Card component for standalone usage
const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: string;
}> = ({ children, className = "", padding = "lg" }) => {
  const paddingClass = padding === "lg" ? "p-6 sm:p-8" : "p-4 sm:p-6";
  return (
    <div
      className={`bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${paddingClass} ${className}`}
      style={{
        boxShadow:
          "0 -4px 15px rgba(0, 0, 0, 0.1), 0 10px 25px rgba(0, 0, 0, 0.15)",
      }}
    >
      {children}
    </div>
  );
};

// Individual card component with its own animation
const AnimatedCard: React.FC<{
  item: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    metric: string;
    numericValue: number;
  };
  index: number;
  isVisible: boolean;
  animationDelay: number;
}> = ({ item, index, isVisible, animationDelay }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Trigger animation with delay
  useEffect(() => {
    if (!isCardVisible) return;

    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [isCardVisible, animationDelay]);

  // Animate the numeric value
  useEffect(() => {
    if (!shouldAnimate || hasAnimated) return;

    setHasAnimated(true);

    const animationDuration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = (animationDuration / 1000) * frameRate;
    let currentFrame = 0;

    const animate = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedValue(Math.floor(easedProgress * item.numericValue));

      if (currentFrame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        // Ensure we hit the exact target value
        setAnimatedValue(item.numericValue);
      }
    };

    // Start number animation after card appears
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300);
  }, [shouldAnimate, hasAnimated, item.numericValue]);

  const formatValue = (value: number, originalValue: string) => {
    if (originalValue.includes("%")) {
      return `${value}%`;
    } else if (originalValue.includes("°")) {
      return `${value}°`;
    } else if (originalValue.includes("+")) {
      return `${value}+ Years`;
    } else if (originalValue.includes("/")) {
      // For 24/7, show both numbers counting proportionally
      const secondValue = Math.floor((value / 24) * 7);
      return `${value}/${secondValue}`;
    }
    return value.toString();
  };

  return (
    <div ref={cardRef}>
      <Card
        className={`text-center transition-all duration-700 ease-out transform ${
          shouldAnimate
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-16 scale-95"
        }`}
        padding="lg"
      >
        <div
          className={`text-[#032685] mb-4 sm:mb-6 flex justify-center transition-all duration-500 ${
            shouldAnimate ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{
            transitionDelay: shouldAnimate ? "200ms" : "0ms",
          }}
        >
          {item.icon}
        </div>
        <div
          className={`text-xl sm:text-2xl lg:text-3xl font-black text-[#032685] mb-2 sm:mb-3 transition-all duration-500 ${
            shouldAnimate ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{
            transitionDelay: shouldAnimate ? "400ms" : "0ms",
          }}
        >
          {formatValue(animatedValue, item.metric)}
        </div>
        <div
          className={`flex flex-col justify-end transition-all duration-500 ${
            shouldAnimate
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: shouldAnimate ? "600ms" : "0ms",
          }}
        >
          <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {item.desc}
          </p>
        </div>
      </Card>
    </div>
  );
};

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ isVisible }) => {
  const t = useTranslations("whyUs");

  const reasons = [
    {
      icon: <Users className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />,
      title: t("reasons.successfulProjects.title"),
      desc: t("reasons.successfulProjects.description"),
      metric: "100%",
      numericValue: 100,
    },
    {
      icon: <Building className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />,
      title: t("reasons.completeSolutions.title"),
      desc: t("reasons.completeSolutions.description"),
      metric: "360°",
      numericValue: 360,
    },
    {
      icon: <Shield className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />,
      title: t("reasons.completeService.title"),
      desc: t("reasons.completeService.description"),
      metric: "24/7",
      numericValue: 24,
    },
    {
      icon: <Star className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />,
      title: t("reasons.proTeam.title"),
      desc: t("reasons.proTeam.description"),
      metric: "7+ Years",
      numericValue: 15,
    },
  ];

  return (
    <section
      id="why-us"
      className="py-16 sm:py-20 lg:py-32"
      data-section="why-us"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-2xl text-gray-600 max-w-4xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-end">
          {reasons.reverse().map((item, index) => (
            <AnimatedCard
              key={index}
              item={item}
              index={index}
              isVisible={isVisible}
              animationDelay={index * 200} // Staggered delay: 0ms, 200ms, 400ms, 600ms
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
