import { useEffect, useState, useRef } from "react";

export const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready after any conditional rendering
    const timeout = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId =
                entry.target.getAttribute("data-section") || entry.target.id;
              setIsVisible((prev) => ({ ...prev, [sectionId]: true }));
            }
          });
        },
        { threshold: 0.1 }
      );

      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => {
        if (observerRef.current) {
          observerRef.current.observe(section);
        }
      });
    }, 150);

    return () => {
      clearTimeout(timeout);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return isVisible;
};
