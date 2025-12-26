import { NavigationItem, PhoneNumber } from "@/types/common";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "home", label: "navigation.home", href: "#home" },
  { id: "about", label: "navigation.about", href: "#about" },
  { id: "services", label: "navigation.services", href: "#services" },
  { id: "projects", label: "navigation.projects", href: "#projects" },
  { id: "catalog", label: "navigation.catalog", href: "#catalog" },
  { id: "contact", label: "navigation.contact", href: "#contact" },
];

export const PHONE_NUMBERS: PhoneNumber[] = [
  {
    value: "995514107878",
    label: "+995 514 107 878",
    display: "+995 514 107 878",
  },
  {
    value: "995598505522",
    label: "+995 598 505 522",
    display: "+995 598 505 522",
  },
  {
    value: "+995598004778",
    label: "+995 598 004 778",
    display: "+995 598 004 778",
  },
];

// Quick replies translation keys - actual text will come from translations
export const QUICK_REPLIES_KEYS = [
  "whatsapp.quickReplies.services",
  "whatsapp.quickReplies.quote",
  "whatsapp.quickReplies.consultation",
  "whatsapp.quickReplies.pricing",
  "whatsapp.quickReplies.projects",
];
