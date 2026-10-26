import React from 'react';
import { X, Heart, CheckCircle2, Lock } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'basic' | 'premium') => void;
  extraDoramaTitle?: string;
  thirdDoramaTitle?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
  extraDoramaTitle = 'O Segredo do Bilionário Desconhecido',
  thirdDoramaTitle = 'A Esposa Secreta do Mafioso',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md overflow-hidden select-none animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-[350px] bg-[#0d0d12] border border-rose-500/80 rounded-2xl p-4 sm:p-5 shadow-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fechar sem comprar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white bg-zinc-900 rounded-full cursor-pointer transition-colors z-10"
          aria-label="Fechar"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* 👑 ESPERA! OFERTA ESPECIAL 3 EM 1 - Centralizado em duas linhas */}
        <div className="text-center pt-1">
          <h3 className="text-base sm:text-lg font-black text-white leading-snug tracking-tight text-center font-serif-drama">
            <span className="block text-amber-400">👑 ESPERA!</span>
            <span className="block text-white">OFERTA ESPECIAL 3 EM 1</span>
          </h3>
          <p className="text-[11px] font-bold text-rose-400 mt-1 text-center">
            Leve 3 DORAMAS COMPLETOS por apenas R$ 5 a mais!
          </p>
        </div>

        {/* Lista Compacta dos 3 Doramas */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1 text-xs text-zinc-200">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate"><strong className="text-white">Envenenada Pelo Seu Amor</strong> (56 eps)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate"><strong className="text-white">{extraDoramaTitle}</strong> (Completo)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate"><strong className="text-white">{thirdDoramaTitle}</strong> (Completo)</span>
          </div>
        </div>

        {/* Preço Objetivo: de 89,90 para 14,90 */}
        <div className="mt-2.5 text-center">
          <span className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider block">
            De <span className="line-through text-zinc-500 font-price">R$ 89,90</span> para:
          </span>
          <div className="text-3xl font-black text-white font-price tracking-tight text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]">
            R$ 14,90
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
            🔥 Triplique seus doramas pagando só R$ 5 a mais!
          </span>
        </div>

        {/* Botões de Ação */}
        <div className="mt-3 space-y-1.5">
          <button
            type="button"
            onClick={() => onSelectPlan('premium')}
            className="w-full py-3 px-3 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 rounded-xl transition-all shadow-lg shadow-rose-950/80 active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer border border-rose-400/40"
          >
            <Heart className="w-4 h-4 fill-current text-white shrink-0" />
            <span>SIM! QUERO OS 3 DORAMAS ❤️</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPlan('basic')}
            className="w-full py-1 text-xs text-zinc-400 hover:text-zinc-200 text-center cursor-pointer transition-colors"
          >
            Não, prefiro apenas 1 dorama.
          </button>
        </div>

        {/* Garantia Discreta */}
        <div className="mt-2 pt-1.5 border-t border-zinc-800/80 text-[10px] text-zinc-400 text-center flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>Pagamento único • Acesso imediato • Sem mensalidades</span>
        </div>
      </div>
    </div>
  );
};
