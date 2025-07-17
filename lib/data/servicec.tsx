import React from "react";
import { Monitor, Eye, Server, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Service } from "@/types/service";

export const useServicesData = (): Service[] => {
  const t = useTranslations("services.items");

  return [
    {
      icon: <Monitor className="w-16 h-16 text-[#032685]" />,
      title: t("digitalSignage.title"),
      description: t("digitalSignage.description"),
      features: [
        t("digitalSignage.features.0"),
        t("digitalSignage.features.1"),
        t("digitalSignage.features.2"),
        t("digitalSignage.features.3"),
      ],
      benefits: [
        t("digitalSignage.benefits.0"),
        t("digitalSignage.benefits.1"),
        t("digitalSignage.benefits.2"),
        t("digitalSignage.benefits.3"),
      ],
    },
    {
      icon: <Eye className="w-16 h-16 text-[#032685]" />,
      title: t("videoWalls.title"),
      description: t("videoWalls.description"),
      features: [
        t("videoWalls.features.0"),
        t("videoWalls.features.1"),
        t("videoWalls.features.2"),
        t("videoWalls.features.3"),
      ],
      benefits: [
        t("videoWalls.benefits.0"),
        t("videoWalls.benefits.1"),
        t("videoWalls.benefits.2"),
        t("videoWalls.benefits.3"),
      ],
    },
    {
      icon: <Server className="w-16 h-16 text-[#032685]" />,
      title: t("itInfrastructure.title"),
      description: t("itInfrastructure.description"),
      features: [
        t("itInfrastructure.features.0"),
        t("itInfrastructure.features.1"),
        t("itInfrastructure.features.2"),
        t("itInfrastructure.features.3"),
      ],
      benefits: [
        t("itInfrastructure.benefits.0"),
        t("itInfrastructure.benefits.1"),
        t("itInfrastructure.benefits.2"),
        t("itInfrastructure.benefits.3"),
      ],
    },
    {
      icon: <Home className="w-16 h-16 text-[#032685]" />,
      title: t("roomEquipment.title"),
      description: t("roomEquipment.description"),
      features: [
        t("roomEquipment.features.0"),
        t("roomEquipment.features.1"),
        t("roomEquipment.features.2"),
        t("roomEquipment.features.3"),
      ],
      benefits: [
        t("roomEquipment.benefits.0"),
        t("roomEquipment.benefits.1"),
        t("roomEquipment.benefits.2"),
        t("roomEquipment.benefits.3"),
      ],
    },
  ];
};
