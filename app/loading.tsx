import React from "react";
import Image from "next/image";
import { Svgs } from "@/components/constants";
import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations("loading");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo Container with Animation */}
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl">
              <Image
                src={Svgs.MainLogo}
                alt="Maze Group Logo"
                width={96}
                height={96}
                priority
              />
            </div>
          </div>

          {/* Rotating Ring */}
          <div className="absolute -inset-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{t("title")}</h2>
          <p className="text-gray-600 max-w-md text-center">
            {t("description")}
          </p>
        </div>

        {/* Creative Statistics Preview - Optimized Sizes */}
        <div className="flex items-center space-x-12 mt-8 text-center">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-blue-600 animate-pulse leading-none">
              24/7
            </div>
            <div className="text-sm text-gray-600">{t("innovation")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
