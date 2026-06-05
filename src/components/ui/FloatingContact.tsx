'use client';

import { Mail, Phone } from 'lucide-react';
import AccessibilityWidget from './AccessibilityWidget';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-4 z-[90] flex flex-col gap-2">
      
      {/* Accessibility Button (Blue) */}
      <AccessibilityWidget />

      {/* Email Button */}
      <a href="mailto:info@andresrealty.com" className="w-10 h-10 rounded-full bg-black border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white hover:text-black transition-all duration-300">
        <Mail className="w-4 h-4 stroke-[1.5]" />
      </a>

      {/* Phone Button (WhatsApp Green) */}
      <a href="https://wa.me/50660413905" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white hover:text-[#25D366] hover:border-[#25D366] transition-all duration-300">
        <Phone className="w-4 h-4 stroke-[1.5]" />
      </a>

    </div>
  );
}
