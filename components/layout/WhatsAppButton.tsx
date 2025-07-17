"use client";
import React from "react";
import { Images } from "@/components/constants";
interface WhatsAppButtonProps {
  onClick: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="whatsap-button fixed bottom-14 right-12  rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-40"
    >
      <img
        src={Images.Whatsapp}
        alt="Whatsapp logo"
        className="whatsap-button w-16 h-16"
      />
    </button>
  );
};
