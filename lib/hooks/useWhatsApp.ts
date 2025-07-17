"use client";
import { useState } from "react";

export const useWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("+995 514 107 878");
  const [message, setMessage] = useState(
    "Hi Maze Group, I'm interested in learning more about your services..."
  );

  const phoneNumbers = [
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

  const sendMessage = () => {
    const phoneNumber = phoneNumbers.find(
      (phone) => phone.display === selectedPhone
    )?.value;
    if (phoneNumber && message.trim()) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
      setIsOpen(false);
    }
  };

  const setProductMessage = (productName: string) => {
    setMessage(
      `Hi Maze Group, I'm interested in learning more about ${productName}. Please provide more details about specifications and pricing.`
    );
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    selectedPhone,
    setSelectedPhone,
    message,
    setMessage,
    phoneNumbers,
    sendMessage,
    setProductMessage,
  };
};
