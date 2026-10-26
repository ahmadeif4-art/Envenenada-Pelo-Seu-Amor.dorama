import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';

interface TestimonialImage {
  id: string;
  localSrc: string;
  fallbackSrc: string;
  alt: string;
}

const TESTIMONIALS: TestimonialImage[] = [
  {
    id: 'cinthia',
    localSrc: '/src/assets/images/depoimento_cinthia.webp',
    fallbackSrc: 'https://i.imgur.com/XIOblrN.jpeg',
    alt: 'Depoimento real de cliente Cinthia sobre o dorama',
  },
  {
    id: 'bianca',
    localSrc: '/src/assets/images/depoimento_bianca.webp',
    fallbackSrc: 'https://i.imgur.com/Kd5hIWr.jpeg',
    alt: 'Depoimento real de cliente Bianca recomendando a compra',
  },
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto-play suave a cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Gestos de toque no celular (Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="max-w-md mx-auto px-4 mb-12 text-center select-none">
      {/* Título com estrelas */}
      <div className="flex flex-col items-center mb-3">
        <div className="flex text-amber-400 gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Depoimentos reais de quem já assistiu</span>
        </div>
      </div>

      {/* Carrossel de Imagens Reais */}
      <div
        className="relative bg-zinc-950/85 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-3 flex items-center justify-center min-h-[380px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Imagem do Slide Atual (Lazy loaded & WebP) */}
        <div className="w-full flex justify-center transition-all duration-300 ease-in-out">
          <img
            key={TESTIMONIALS[currentIndex].id}
            src={TESTIMONIALS[currentIndex].localSrc}
            loading="lazy"
            decoding="async"
            width={310}
            height={370}
            onError={(e) => {
              (e.target as HTMLImageElement).src = TESTIMONIALS[currentIndex].fallbackSrc;
            }}
            alt={TESTIMONIALS[currentIndex].alt}
            className="w-full max-w-[280px] sm:max-w-[310px] h-auto rounded-xl object-contain shadow-md border border-zinc-800/90"
          />
        </div>

        {/* Botão Anterior */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white border border-zinc-700/80 flex items-center justify-center cursor-pointer transition-colors shadow-lg z-10"
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Botão Próximo */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white border border-zinc-700/80 flex items-center justify-center cursor-pointer transition-colors shadow-lg z-10"
          aria-label="Próximo depoimento"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Marcadores de Pontos (Dots) */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {TESTIMONIALS.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => setCurrentIndex(dotIdx)}
            className={`transition-all rounded-full cursor-pointer ${
              currentIndex === dotIdx
                ? 'w-6 h-1.5 bg-rose-500'
                : 'w-2 h-1.5 bg-zinc-700 hover:bg-zinc-500'
            }`}
            aria-label={`Ver depoimento ${dotIdx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
