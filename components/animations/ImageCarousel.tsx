import React from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useImageCarousel } from "@/lib/hooks/useImageCarousel";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt,
  autoPlay = false,
  showControls = true,
}) => {
  const {
    currentImageIndex,
    isPlaying,
    setIsPlaying,
    nextImage,
    prevImage,
    goToImage,
  } = useImageCarousel(images, autoPlay);

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}
        alt={alt}
        className="w-full h-96 object-cover rounded-2xl"
      />

      {showControls && images.length > 1 && (
        <>
          {/* Image Controls */}
          <div className="absolute bottom-6 right-6 flex items-center space-x-4 bg-black/50 rounded-full px-4 py-2">
            <button
              onClick={prevImage}
              className="text-white hover:text-[#6b93ff]"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            {autoPlay && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-[#6b93ff]"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
            )}
            <button
              onClick={nextImage}
              className="text-white hover:text-[#6b93ff]"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <span className="text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </span>
          </div>

          {/* Dot Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-[#032685]" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
