"use client";
import React from "react";
import Image from "next/image";
import { Images } from "@/components/constants";

interface WhatsAppButtonProps {
  onClick: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="whatsap-button fixed bottom-14 right-12 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-40"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative w-16 h-16">
        <Image
          src={Images.Whatsapp}
          alt="WhatsApp - Contact Maze Group for hotel equipment and IT solutions"
          fill
          className="object-contain"
          sizes="64px"
        />
      </div>
    </button>
  );
};
