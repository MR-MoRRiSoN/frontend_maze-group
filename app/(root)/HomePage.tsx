"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Navigation } from "@/components/layout/Navigation";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { WhatsAppCard } from "@/components/features/contact/WhatsAppCard";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
// import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { useWhatsApp } from "@/lib/hooks/useWhatsApp";
import { scrollToSection } from "@/lib/utils/helpers";
import { getProjectsByLocale } from "@/lib/data/projects";
import { getProductsByLocale } from "@/lib/data/products";
import { Project } from "@/types/project";
import { Product } from "@/types/product";

export default function HomePage() {
  const router = useRouter();
  const locale = useLocale();
  const isVisible = useIntersectionObserver();
  const whatsapp = useWhatsApp();

  // Get projects and products based on current locale
  const allProjects = useMemo(() => getProjectsByLocale(locale), [locale]);
  const products = useMemo(() => getProductsByLocale(locale), [locale]);

  // Show only first 10 projects on home page for better performance
  const featuredProjects = useMemo(
    () => allProjects.slice(0, 10),
    [allProjects]
  );

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  // Updated to use Next.js navigation for projects
  const handleProjectView = (project: Project) => {
    router.push(`/project-detail/${project.id}`);
  };

  // Updated to use Next.js navigation for products
  const handleProductView = (product: Product) => {
    window.open(product.pdfLink, "_blank");
  };

  const handleProductContact = (product: Product) => {
    whatsapp.setProductMessage(product.name);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onSectionClick={handleSectionClick} />

      <HeroSection
        onAboutClick={() => handleSectionClick("about")}
        onProjectsClick={() => handleSectionClick("projects")}
      />
      <StatsSection />

      <WhyUsSection isVisible={isVisible["why-us"]} />
      <ServicesSection isVisible={isVisible.services} />
      {/* <BenefitsSection isVisible={isVisible.benefits} /> */}
      {/* Projects section now uses locale-based projects */}
      <ProjectsSection
        projects={featuredProjects}
        isVisible={isVisible.projects}
        onProjectView={handleProjectView}
        onStartProject={() => whatsapp.setIsOpen(true)}
      />

      {/* Catalog section now uses locale-based products */}
      <CatalogSection
        products={products}
        isVisible={isVisible.catalog}
        onProductView={handleProductView}
        onProductContact={handleProductContact}
        onRequestCustomSolution={() => whatsapp.setIsOpen(true)}
      />
      <CompaniesSection isVisible={isVisible.companies} />
      <AboutSection isVisible={isVisible.about} />
      <ContactSection
        isVisible={isVisible.contact}
        onStartProject={() => whatsapp.setIsOpen(true)}
      />

      <WhatsAppButton onClick={() => whatsapp.setIsOpen((prev) => !prev)} />

      <WhatsAppCard
        isOpen={whatsapp.isOpen}
        selectedPhone={whatsapp.selectedPhone}
        setSelectedPhone={whatsapp.setSelectedPhone}
        message={whatsapp.message}
        setMessage={whatsapp.setMessage}
        onSend={whatsapp.sendMessage}
        onClose={() => whatsapp.setIsOpen(false)}
      />
    </div>
  );
}
