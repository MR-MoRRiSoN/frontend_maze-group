import { Benefit } from "@/types/benefit";
import {
  Star,
  Zap,
  Building,
  Shield,
  Clock,
  CheckCircle,
  Users,
  DollarSign,
  Heart,
  BarChart3,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const getBenefits = (): Benefit[] => {
  const t = useTranslations();

  return [
    {
      icon: <Zap className="w-16 h-16 text-[#032685]" />,
      title: t("benefits.lightningFast.title"),
      description: t("benefits.lightningFast.description"),
      stats: {
        speed: t("benefits.lightningFast.stats.speed"),
        efficiency: t("benefits.lightningFast.stats.efficiency"),
        satisfaction: t("benefits.lightningFast.stats.satisfaction"),
      },
    },
    {
      icon: <CheckCircle className="w-16 h-16 text-[#032685]" />,
      title: t("benefits.qualityGuaranteed.title"),
      description: t("benefits.qualityGuaranteed.description"),
      stats: {
        quality: t("benefits.qualityGuaranteed.stats.quality"),
        reviews: t("benefits.qualityGuaranteed.stats.reviews"),
        repeat: t("benefits.qualityGuaranteed.stats.repeat"),
      },
    },
    {
      icon: <Users className="w-16 h-16 text-[#032685]" />,
      title: t("benefits.expertTeam.title"),
      description: t("benefits.expertTeam.description"),
      stats: {
        experience: t("benefits.expertTeam.stats.experience"),
        experts: t("benefits.expertTeam.stats.experts"),
        success: t("benefits.expertTeam.stats.success"),
      },
    },
    {
      icon: <DollarSign className="w-16 h-16 text-[#032685]" />,
      title: t("benefits.costEffective.title"),
      description: t("benefits.costEffective.description"),
      stats: {
        savings: t("benefits.costEffective.stats.savings"),
        value: t("benefits.costEffective.stats.value"),
        roi: t("benefits.costEffective.stats.roi"),
      },
    },
    {
      icon: <Heart className="w-16 h-16 text-[#032685]" />,
      title: t("benefits.support247.title"),
      description: t("benefits.support247.description"),
      stats: {
        uptime: t("benefits.support247.stats.uptime"),
        response: t("benefits.support247.stats.response"),
        support: t("benefits.support247.stats.support"),
      },
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-[#032685]" />,
      title: t("benefits.realTimeAnalytics.title"),
      description: t("benefits.realTimeAnalytics.description"),
      stats: {
        insights: t("benefits.realTimeAnalytics.stats.insights"),
        metrics: t("benefits.realTimeAnalytics.stats.metrics"),
        reports: t("benefits.realTimeAnalytics.stats.reports"),
      },
    },
  ];
};
