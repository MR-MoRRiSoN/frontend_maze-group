import { useState, useEffect } from "react";

export const useImageCarousel = (
  images: string[],
  autoPlay: boolean = false
) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlay && isPlaying && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length, isPlaying, autoPlay]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return {
    currentImageIndex,
    setCurrentImageIndex,
    isPlaying,
    setIsPlaying,
    nextImage,
    prevImage,
    goToImage,
  };
};
