'use client';

import { Mail, Phone } from 'lucide-react';
import AccessibilityWidget from './AccessibilityWidget';

interface FloatingContactProps {
  contactEmail?: string;
  contactPhone?: string;
}

export default function FloatingContact({ 
  contactEmail = "info@andresrealty.com",
  contactPhone = "+506 6000 0000"
}: FloatingContactProps) {
  
  // Format phone for whatsapp link (remove spaces and special chars)
  const cleanPhone = contactPhone.replace(/[\s\-\+]/g, '');

  return (
    <div className="fixed bottom-24 right-6 z-[90] flex flex-col gap-3">
      
      {/* Accessibility Button (Blue) */}
      <AccessibilityWidget />

      {/* Email Button */}
      <a href={`mailto:${contactEmail}`} className="w-12 h-12 rounded-full bg-black border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300" aria-label="Enviar Email">
        <Mail className="w-5 h-5 stroke-[1.5]" />
      </a>

    </div>
  );
}
