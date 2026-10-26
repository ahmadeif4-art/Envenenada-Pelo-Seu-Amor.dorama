import React, { useState } from 'react';
import { POSTER_MAIN } from '../constants/initialData';

export const HeroSection: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(POSTER_MAIN);

  return (
    <section className="pt-8 pb-6 sm:pt-12 sm:pb-8 text-center max-w-3xl mx-auto px-4">
      {/* 2. Headline principal - Primeira fonte (Playfair Display) */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-serif-drama mb-4">
        Envenenada Pelo Seu Amor
      </h1>

      {/* 3. Subheadline — Linguagem simples e de alto desejo com fonte maior */}
      <p className="text-base sm:text-xl md:text-2xl font-medium text-zinc-200 leading-snug sm:leading-relaxed max-w-xl mx-auto mb-6">
        Um casamento forçado, um homem perigoso e uma paixão tão intensa que é <span className="text-rose-400 font-semibold">impossível parar de assistir</span>. ❤️
      </p>

      {/* Imagem Hero Otimizada (High priority, WebP, zero layout shift) */}
      <div className="flex justify-center">
        <div className="relative w-52 sm:w-64 aspect-[530/692] rounded-2xl overflow-hidden shadow-2xl border border-rose-900/50 bg-zinc-950">
          <img
            src={imgSrc}
            onError={() => setImgSrc('https://i.imgur.com/unCYJ35.png')}
            alt="Envenenada Pelo Seu Amor — A Noiva Substituta"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={256}
            height={334}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
