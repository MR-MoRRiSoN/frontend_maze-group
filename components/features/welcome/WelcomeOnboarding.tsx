"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Svgs } from "@/components/constants";

const FIRST_VISIT_KEY = "maze_group_first_visit";

export const WelcomeOnboarding: React.FC = () => {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  const handleExplore = () => {
    setShowVideo(true);
  };

  const handleComplete = () => {
    // Mark as visited in localStorage
    localStorage.setItem(FIRST_VISIT_KEY, "true");
    // Navigate to home page
    router.push("/");
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (showVideo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Full-screen video - optimized for mobile */}
        <video
          autoPlay
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={handleComplete}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        >
          <source src="/assets/maze-video.mov" type="video/mp4" />
          <source src="/assets/maze-video.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {/* Skip button overlay - Bottom Right, responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8"
        >
          <Button
            variant="secondary"
            size="md"
            onClick={handleSkip}
            className="shadow-2xl hover:shadow-3xl backdrop-blur-sm bg-white/90 text-sm sm:text-base"
          >
            Skip
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#e6f2ff] via-white to-[#e6f2ff] overflow-hidden">
      {/* Animated background elements - using brand colors */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#032685]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#6b93ff]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#4d7cff]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Company Logo */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-12"
            >
              <div className="inline-block p-8 bg-white/80 backdrop-blur-lg rounded-3xl border-2 border-[#032685]/20 shadow-2xl">
                <img
                  src={Svgs.MainLogo}
                  alt="Maze Group Logo"
                  className="w-48 h-auto md:w-64"
                />
              </div>
            </motion.div>

            {/* Welcome text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#032685] mb-6"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#032685] via-[#4d7cff] to-[#6b93ff] bg-clip-text text-transparent">
                Maze Group
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-3xl text-[#032685]/90 mb-4 font-semibold"
            >
              Where Innovation Meets Excellence
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Experience cutting-edge IT and hospitality solutions designed for
              the future. Let us show you what makes us different.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button
                variant="primary"
                size="xl"
                onClick={handleExplore}
                className="bg-[#032685] text-white hover:bg-[#021d5a] shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
              >
                Explore About Us
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative grid pattern with brand colors */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(3,38,133,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(3,38,133,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
    </div>
  );
};
