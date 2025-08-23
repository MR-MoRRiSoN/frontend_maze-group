// components/layout/Navigation.tsx
"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Svgs } from "../constants";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";
import { US, GE, RU } from "country-flag-icons/react/3x2";

interface Language {
  code: Locale;
  name: string;
  flag: React.ComponentType<{ className?: string }>;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: US },
  { code: "ge", name: "ქართული", flag: GE },
  { code: "ru", name: "Русский", flag: RU },
];

interface NavigationProps {
  onSectionClick: (sectionId: string) => void;
}

// Custom hook for click outside detection
const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export const Navigation: React.FC<NavigationProps> = ({ onSectionClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLocale = useLocale() as Locale;
  const t = useTranslations("navigation");

  // References for click outside detection
  const mobileMenuRef = useClickOutside(() => setMobileMenuOpen(false));
  const languageMenuRef = useClickOutside(() => setLanguageMenuOpen(false));

  const navigationItems = [
    { id: "home", label: t("home"), href: "#home" },
    { id: "services", label: t("services"), href: "#services" },
    { id: "projects", label: t("projects"), href: "#projects" },
    { id: "catalog", label: t("catalog"), href: "#catalog" },
    { id: "about", label: t("about"), href: "#about" },
    { id: "contact", label: t("contact"), href: "#contact" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (languageCode: Locale) => {
    startTransition(() => {
      setUserLocale(languageCode);
    });
    setLanguageMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg z-40 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div
              onClick={() => onSectionClick("home")}
              className="text-xl sm:text-2xl md:text-3xl font-black text-[#032685] cursor-pointer"
            >
              <img width={120} src={Svgs.MainLogo} alt="App Logo" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className="text-gray-700 hover:text-[#032685] font-semibold text-base xl:text-lg transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#032685] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Right Side - Language Selector & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Desktop Language Selector (Hidden on mobile) */}
            <div className="relative hidden lg:block" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-[#032685] hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label={t("selectLanguage")}
                disabled={isPending}
              >
                <currentLang.flag className="w-5 h-3 rounded-sm shadow-sm" />
                <span className="text-sm">{currentLang.name}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    languageMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Language Dropdown */}
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-in slide-in-from-top duration-200">
                  {languages.map((language) => {
                    const FlagComponent = language.flag;
                    return (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                          currentLocale === language.code
                            ? "bg-blue-50 text-[#032685]"
                            : "text-gray-700"
                        }`}
                        disabled={isPending}
                      >
                        <FlagComponent className="w-6 h-4 rounded-sm shadow-sm" />
                        <span className="text-sm font-medium">
                          {language.name}
                        </span>
                        {currentLocale === language.code && (
                          <span className="ml-auto text-[#032685] text-xs">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-[#032685] p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
              aria-label={t("toggleMenu")}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              ) : (
                <Menu className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden bg-white border-t border-gray-200 py-2 sm:py-4 animate-in slide-in-from-top duration-200"
          >
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 sm:py-3 text-gray-700 hover:text-[#032685] hover:bg-gray-50 font-semibold text-base sm:text-lg transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Language Selection */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="px-4 py-2 text-gray-500 text-sm font-medium">
                {t("language")}
              </div>
              {languages.map((language) => {
                const FlagComponent = language.flag;
                return (
                  <button
                    key={language.code}
                    onClick={() => {
                      handleLanguageChange(language.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                      currentLocale === language.code
                        ? "bg-blue-50 text-[#032685]"
                        : "text-gray-700"
                    }`}
                    disabled={isPending}
                  >
                    <FlagComponent className="w-6 h-4 rounded-sm shadow-sm" />
                    <span className="text-sm font-medium">{language.name}</span>
                    {currentLocale === language.code && (
                      <span className="ml-auto text-[#032685] text-xs">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
