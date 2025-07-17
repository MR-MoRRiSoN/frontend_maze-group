"use client";
import React, { useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PHONE_NUMBERS, QUICK_REPLIES } from "@/lib/utils/constants";
import { useTranslations } from "next-intl";

interface WhatsAppCardProps {
  isOpen: boolean;
  selectedPhone: string;
  setSelectedPhone: (phone: string) => void;
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  onClose: () => void;
}

export const WhatsAppCard: React.FC<WhatsAppCardProps> = ({
  isOpen,
  selectedPhone,
  setSelectedPhone,
  message,
  setMessage,
  onSend,
  onClose,
}) => {
  const t = useTranslations();
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (target.className.includes("whatsap-button")) {
        return;
      }

      if (cardRef.current && !cardRef.current.contains(target as Node)) {
        console.log(event);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
  };

  return (
    <div
      ref={cardRef}
      className="fixed bottom-32 right-8 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-80 z-50 transform animate-scale-in"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={t("whatsapp.closeButton")}
      >
        <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
      </button>

      <div className="mb-4 pr-8">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {t("whatsapp.title")}
        </h3>
        <p className="text-gray-600 text-sm">{t("whatsapp.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {/* Phone Number Selection */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            {t("whatsapp.phoneLabel")}
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            value={selectedPhone}
            onChange={(e) => setSelectedPhone(e.target.value)}
          >
            {PHONE_NUMBERS.map((phone) => (
              <option key={phone.value} value={phone.display}>
                {phone.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Replies */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            {t("whatsapp.quickRepliesLabel")}
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="text-xs bg-gray-100 hover:bg-green-100 text-gray-700 px-2 py-1 rounded-lg transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Message Text Area */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            {t("whatsapp.messageLabel")}
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("whatsapp.messagePlaceholder")}
          />
        </div>

        {/* Send Button */}
        <Button
          onClick={onSend}
          disabled={!message.trim()}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 font-semibold text-sm flex items-center justify-center"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {t("whatsapp.sendButton")}
        </Button>
      </div>
    </div>
  );
};
