"use client";
import React, { useRef, useEffect } from "react";
import Plyr, { APITypes } from "plyr-react";

// ❌ წაშლილია CSS import - ახლა CDN-დან იტვირთება layout.tsx-დან
// import "plyr-react/plyr.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className = "",
}) => {
  const plyrRef = useRef<APITypes | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle space key when this player is hovered
      if (e.code === "Space" || e.key === " ") {
        const target = e.target as HTMLElement;

        // Check if space should work (not in input/textarea/button)
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          target.tagName !== "BUTTON"
        ) {
          // Check if mouse is over this specific video
          if (isHoveredRef.current && plyrRef.current?.plyr) {
            e.preventDefault();
            e.stopPropagation();
            plyrRef.current.plyr.togglePlay();
          }
        }
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("keydown", handleKeyPress, true);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("keydown", handleKeyPress, true);
    };
  }, []);

  const videoSrc = {
    type: "video" as const,
    sources: [
      {
        src: src,
        type: "video/mp4",
      },
    ],
    poster: poster,
  };

  const plyrOptions = {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
    settings: ["quality", "speed"],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
    quality: {
      default: 720,
      options: [1080, 720, 480, 360],
    },
    ratio: "16:9",
    hideControls: true,
    resetOnEnd: false,
    keyboard: { focused: false, global: false },
    tooltips: { controls: true, seek: true },
    fullscreen: { enabled: true, fallback: true, iosNative: true },
    storage: { enabled: true, key: "plyr" },
    invertTime: false,
    blankVideo: "",
    autopause: false,
    disableContextMenu: true,
  };

  return (
    <div ref={containerRef} className={`video-player-wrapper ${className}`}>
      <style jsx global>{`
        .plyr {
          --plyr-color-main: #032685;
          --plyr-video-background: #000;
          --plyr-menu-background: rgba(0, 0, 0, 0.9);
          --plyr-menu-color: #fff;
          border-radius: 1rem;
          overflow: hidden;
        }

        .plyr__control--overlaid {
          background: rgba(3, 38, 133, 0.9);
          border-radius: 50%;
          padding: 20px;
          transition: background 0.3s ease;
        }

        .plyr__control--overlaid:hover {
          background: rgba(3, 38, 133, 1);
        }

        .plyr--video .plyr__control.plyr__tab-focus,
        .plyr--video .plyr__control:hover,
        .plyr--video .plyr__control[aria-expanded="true"] {
          background: #021d5a;
          color: #fff !important;
        }

        .plyr__control:hover {
          color: #fff !important;
        }

        .plyr__control svg {
          transition: none;
        }

        .plyr__control.plyr__tab-focus {
          box-shadow: 0 0 0 5px rgba(3, 38, 133, 0.5);
        }

        .plyr--full-ui input[type="range"] {
          color: #032685;
        }

        .plyr__menu__container {
          border-radius: 0.5rem;
        }

        .plyr__menu__container .plyr__control {
          color: #fff;
        }

        .plyr__menu__container .plyr__control:hover {
          background: #032685;
          color: #fff !important;
        }

        .plyr__tooltip {
          background: rgba(3, 38, 133, 0.9);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #fff;
        }

        .plyr--video {
          background: #000;
        }

        .plyr__controls {
          color: #fff;
        }

        .plyr__controls .plyr__control {
          color: #fff;
        }

        .plyr__time {
          color: #fff !important;
        }

        /* Remove download/right-click */
        .plyr video::-webkit-media-controls-download-button {
          display: none;
        }

        .plyr video::-webkit-media-controls-enclosure {
          overflow: hidden;
        }

        .plyr video::-webkit-media-controls-panel {
          width: calc(100% + 30px);
        }
      `}</style>
      <Plyr ref={plyrRef} source={videoSrc} options={plyrOptions} />
    </div>
  );
};
