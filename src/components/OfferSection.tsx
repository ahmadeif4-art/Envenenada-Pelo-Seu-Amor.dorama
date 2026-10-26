import React from 'react';
import { Heart, Flame, Check } from 'lucide-react';

interface OfferSectionProps {
  onOpenUpgradeModal: () => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onOpenUpgradeModal }) => {
  return (
    <section className="py-8 max-w-md mx-auto px-4 text-center">
      {/* Título */}
      <h2 className="text-xl sm:text-3xl font-black text-white mb-5 tracking-tight">
        Descubra como essa história termina! ❤️
      </h2>

      {/* Card da Oferta Otimizado */}
      <div className="relative bg-zinc-950/90 border border-rose-500/70 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-rose-950/60 text-left">
        
        {/* Selo Discreto de 80% de desconto */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-rose-600 to-red-600 text-white text-[11px] font-black uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
          <Flame className="w-3 h-3 fill-amber-300 text-amber-200" />
          <span>80% DE DESCONTO — SÓ HOJE</span>
        </div>

        {/* Cabeçalho do Preço Otimizado */}
        <div className="text-center pt-2 pb-4 border-b border-zinc-800/80">
          <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-widest block">
            ACESSO COMPLETO
          </span>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-zinc-500 line-through text-xs sm:text-sm font-bold font-price">
              De R$ 49,90
            </span>
            <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase px-2 py-0.5 rounded">
              -80% OFF
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-center">
            <span className="text-4xl sm:text-5xl font-black text-white font-price tracking-tight drop-shadow-[0_0_25px_rgba(225,29,72,0.4)]">
              R$ 9,90
            </span>
          </div>

          <p className="text-[11px] text-rose-300 font-semibold tracking-wide mt-1 uppercase">
            Pagamento único · Acesso imediato
          </p>
        </div>

        {/* Lista de Benefícios */}
        <ul className="py-4 space-y-2.5 text-xs sm:text-sm text-zinc-200 font-medium">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
            <span>Acesso aos 56 episódios completos.</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
            <span>Pagamento único.</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
            <span>Acesso imediato após confirmação.</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
            <span>Assista pelo celular ,computador ou TV.</span>
          </li>
        </ul>

        {/* Botão: ❤️ QUERO ASSISTIR AGORA */}
        <button
          type="button"
          onClick={onOpenUpgradeModal}
          className="w-full py-3.5 px-5 text-sm sm:text-base font-black text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 rounded-xl transition-all shadow-lg shadow-rose-950/80 active:scale-98 animate-pulse-cta flex items-center justify-center gap-2 cursor-pointer border border-rose-400/40"
        >
          <Heart className="w-4 h-4 fill-current text-white shrink-0" />
          <span>❤️ QUERO ASSISTIR AGORA</span>
        </button>
      </div>
    </section>
  );
};
