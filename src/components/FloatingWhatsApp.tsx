import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={generateGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 left-4 z-40 flex items-center gap-2 px-4 py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full shadow-luxury border border-emerald-500/40 transition-all duration-300 hover:scale-105 group active:scale-95"
      aria-label="Chat with Brew and Bean on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-white" />
      <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
        WhatsApp Order
      </span>
    </a>
  );
};
