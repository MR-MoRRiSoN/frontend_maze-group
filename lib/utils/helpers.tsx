export const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

export const generateWhatsAppUrl = (phoneNumber: string, message: string) => {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
