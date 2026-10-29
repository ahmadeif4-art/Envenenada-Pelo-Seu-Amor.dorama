import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { VIDEO_THUMBNAIL } from '../constants/initialData';

interface PurchaseEvent {
  name: string;
  city: string;
  plan: string;
  timeAgo: string;
}

const PURCHASES: PurchaseEvent[] = [
  { name: 'Mariana S.', city: 'São Paulo - SP', plan: 'Liberou os 56 episódios em HD', timeAgo: 'há 4 segundos' },
  { name: 'Camila R.', city: 'Belo Horizonte - MG', plan: 'Garantiu o Combo 3 em 1', timeAgo: 'há 18 segundos' },
  { name: 'Fernanda M.', city: 'Curitiba - PR', plan: 'Liberou os 56 episódios em HD', timeAgo: 'há 32 segundos' },
  { name: 'Juliana P.', city: 'Porto Alegre - RS', plan: 'Garantiu o Combo 3 em 1', timeAgo: 'há 45 segundos' },
  { name: 'Beatriz L.', city: 'Campinas - SP', plan: 'Liberou os 56 episódios em HD', timeAgo: 'há 1 minuto' },
  { name: 'Larissa C.', city: 'Goiânia - GO', plan: 'Liberou os 56 episódios em HD', timeAgo: 'há 1 minuto' },
  { name: 'Amanda T.', city: 'Salvador - BA', plan: 'Garantiu o Combo 3 em 1', timeAgo: 'há 2 minutos' },
  { name: 'Patrícia V.', city: 'Florianópolis - SC', plan: 'Liberou os 56 episódios em HD', timeAgo: 'há 2 minutos' },
  { name: 'Bruna D.', city: 'Rio de Janeiro - RJ', plan: 'Liberou os 56 episódios em HD', timeAgo: 'há 3 minutos' },
  { name: 'Rafaela F.', city: 'Brasília - DF', plan: 'Garantiu o Combo 3 em 1', timeAgo: 'há 3 minutos' },
];

export const SalesToast: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    let hideTimeout: ReturnType<typeof setTimeout>;
    let nextTimeout: ReturnType<typeof setTimeout>;

    // Primeiro toast aparece após 4.5 segundos
    const initialTimer = setTimeout(() => {
      setIsVisible(true);

      // Função de ciclo recursivo
      const scheduleCycle = () => {
        // Fica visível por 4.8 segundos
        hideTimeout = setTimeout(() => {
          setIsVisible(false);

          // Pausa entre 6.5s e 11s antes do próximo toast
          const pauseDelay = 6500 + Math.random() * 4500;
          nextTimeout = setTimeout(() => {
            setCurrentIdx((prev) => (prev + 1) % PURCHASES.length);
            setIsVisible(true);
            scheduleCycle();
          }, pauseDelay);
        }, 4800);
      };

      scheduleCycle();
    }, 4500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = PURCHASES[currentIdx];

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 max-w-[280px] sm:max-w-[310px] w-[calc(100vw-24px)] pointer-events-auto transition-all duration-300 ease-out select-none animate-in fade-in slide-in-from-top-3"
    >
      <div className="relative bg-[#111116]/95 backdrop-blur-md border border-rose-500/35 rounded-xl p-2 sm:p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex items-center gap-2.5 text-left">
        {/* Capa do Dorama em miniatura com selo verificado */}
        <div className="relative shrink-0 w-9 h-12 rounded-lg overflow-hidden border border-rose-500/30 bg-black">
          <img
            src={VIDEO_THUMBNAIL}
            alt="Dorama"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-0.5 rounded-tl">
            <CheckCircle2 className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Informações da compra */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="text-[11px] font-black text-white truncate">{current.name}</span>
            <span className="text-[10px] text-zinc-400 truncate">• {current.city}</span>
          </div>

          <p className="text-[11px] font-bold text-rose-400 leading-tight mt-0.5 truncate">
            {current.plan}
          </p>

          <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-zinc-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Compra verificada</span>
            <span>•</span>
            <span className="text-zinc-400">{current.timeAgo}</span>
          </div>
        </div>

        {/* Botão sutil de fechar */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute top-1.5 right-1.5 p-1 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer rounded-full"
          aria-label="Fechar notificação"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
