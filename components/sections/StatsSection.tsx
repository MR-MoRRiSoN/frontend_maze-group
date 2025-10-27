import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export const StatsSection: React.FC = () => {
  const t = useTranslations("stats");

  const stats = [
    { value: "100+", label: t("completedProjects"), numericValue: 100 },
    { value: "50+", label: t("globalPartners"), numericValue: 50 },
    { value: "24/7", label: t("supportAvailable"), numericValue: 24 },
    { value: "100%", label: t("clientSatisfaction"), numericValue: 100 },
  ];

  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const animationDuration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = (animationDuration / 1000) * frameRate;
    let currentFrame = 0;

    const animate = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedValues(() => {
        return stats.map((stat) => {
          return Math.floor(easedProgress * stat.numericValue);
        });
      });

      if (currentFrame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        // Ensure we hit the exact target values
        setAnimatedValues(stats.map((stat) => stat.numericValue));
      }
    };

    // Start all animations together
    requestAnimationFrame(animate);
  }, [isVisible]);

  const formatValue = (value: number, originalValue: string) => {
    if (originalValue.includes("+")) {
      return `${value}+`;
    } else if (originalValue.includes("%")) {
      return `${value}%`;
    } else if (originalValue.includes("/")) {
      // For 24/7, show both numbers counting proportionally
      const secondValue = Math.floor((value / 24) * 7);
      return `${value}/${secondValue}`;
    }
    return value.toString();
  };

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-[#032685]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 transition-all duration-300">
                {formatValue(animatedValues[index], stat.value)}
              </div>
              <div className="text-sm sm:text-base lg:text-xl font-semibold px-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
