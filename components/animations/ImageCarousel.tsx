import React from "react";
import Image from "next/image";
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
      <div className="relative w-full h-96 rounded-2xl overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`${alt} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={currentImageIndex === 0}
        />
      </div>

      {showControls && images.length > 1 && (
        <>
          {/* Image Controls */}
          <div className="absolute bottom-6 right-6 flex items-center space-x-4 bg-black/50 rounded-full px-4 py-2">
            <button
              onClick={prevImage}
              className="text-white hover:text-[#6b93ff]"
              aria-label="Previous image"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            {autoPlay && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-[#6b93ff]"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
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
              aria-label="Next image"
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
                aria-label={`Go to image ${index + 1}`}
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
