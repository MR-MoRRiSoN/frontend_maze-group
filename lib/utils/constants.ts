import { NavigationItem, PhoneNumber } from "@/types/common";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "catalog", label: "Catalog", href: "#catalog" },
  { id: "contact", label: "Contact", href: "#contact" },
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
];

export const QUICK_REPLIES = [
  "Tell me about your services",
  "Request a quote",
  "Schedule a consultation",
  "View pricing",
  "Ask about projects",
];

export const COMPANIES = [
  "Hilton",
  "Marriott",
  "Radisson",
  "Sheraton",
  "IHG",
  "Kempinski",
  "Biltmore",
  "Rooms Hotels",
  "Ministry of Defence",
  "TAV Georgia",
  "Government of Georgia",
  "Courtyard by Marriott",
];
