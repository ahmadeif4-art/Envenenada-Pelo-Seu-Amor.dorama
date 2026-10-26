import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const MiniGuarantee: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 mt-4 mb-8">
      <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl px-4 py-3 flex items-center gap-3 text-left shadow-sm">
        <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
          <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">
            Garantia Incondicional de 7 Dias
          </span>
          <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">
            Se não gostar do dorama por qualquer motivo, devolvemos 100% do seu dinheiro. Risco zero.
          </p>
        </div>
      </div>
    </div>
  );
};
