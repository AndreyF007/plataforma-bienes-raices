'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface HeroCarouselProps {
  images: string[];
  subtitle: string;
  title: string;
  text: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
}

export default function HeroCarousel({
  images,
  subtitle,
  title,
  text,
  button1Text,
  button1Link,
  button2Text,
  button2Link
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="hero" className="relative w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Background Images with Fade Transition and Parallax (bg-fixed) */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 bg-black transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed opacity-60"
            style={{ 
              backgroundImage: `url(${img})`
            }}
          />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-20">
        <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] text-white tracking-[0.25em] uppercase mb-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {subtitle}
        </p>
        <h1 className="text-[40px] md:text-[60px] font-[family-name:var(--font-raleway)] font-light text-white tracking-[0.2em] uppercase mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
          {title}<sup className="text-sm md:text-xl relative -top-6">®</sup>
        </h1>



        <p className="text-[16px] md:text-[20px] text-white font-[family-name:var(--font-quicksand)] max-w-[800px] leading-[1.6] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          {text}
        </p>


      </div>

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-12 h-[2px] transition-all duration-300 ${
                index === currentIndex ? 'bg-white dark:bg-neutral-950' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
