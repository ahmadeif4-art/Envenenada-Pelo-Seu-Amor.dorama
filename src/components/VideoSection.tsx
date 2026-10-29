import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronDown } from 'lucide-react';
import { VIDEO_THUMBNAIL } from '../constants/initialData';

interface VideoSectionProps {
  videoUrl: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers, setViewers] = useState(149);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Contador oscilante orgânico com crescimento levemente mais rápido e oscilações naturais
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      setViewers((prev) => {
        // Distribuição orgânica (levemente mais dinâmica):
        // ~68% sobe (+1 a +4)
        // ~24% tem uma ou outra queda (-1 a -2)
        // ~8% mantém estável (0)
        const roll = Math.random();
        let delta = 0;

        if (roll < 0.68) {
          // Subida orgânica mais ritmada
          delta = Math.random() < 0.52 ? 1 : Math.random() < 0.82 ? 2 : Math.random() < 0.94 ? 3 : 4;
        } else if (roll < 0.92) {
          // Queda natural (oscilação real: -1 ou -2)
          delta = Math.random() < 0.78 ? -1 : -2;
        } else {
          // Pequena pausa natural
          delta = 0;
        }

        const nextVal = prev + delta;
        // Piso dinâmico em torno de 145 para preservar a ancoragem inicial
        return nextVal < 145 ? 146 + Math.floor(Math.random() * 3) : nextVal;
      });

      // Intervalo variável aleatório entre 1.1s e 2.4s (ritmo levemente mais rápido)
      const nextDelay = 1100 + Math.random() * 1300;
      timeoutId = setTimeout(tick, nextDelay);
    };

    // Primeiro disparo rápido em 0.8s
    timeoutId = setTimeout(tick, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  const isKapwing = videoUrl.includes('kapwing.com');
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0`;
      }
      if (url.includes('watch?v=')) {
        const id = url.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        }
      });
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section className="py-6 sm:py-8 max-w-xl mx-auto px-4 flex flex-col items-center">
      {/* Título: 🎬 Assista uma prévia */}
      <h2 className="text-2xl sm:text-3xl font-black text-white text-center font-serif-drama mb-5">
        🎬 Assista uma prévia
      </h2>

      {/* Player de vídeo vertical (9:16) */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[300px] h-[533.33px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-rose-900/50 group select-none"
      >
        {/* Badge "149 assistindo agora" no canto superior esquerdo com oscilação */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-rose-500/40 text-white px-2.5 py-1 rounded-full shadow-lg pointer-events-none select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-[11px] font-bold tracking-tight">
            <span className="text-white font-price font-black tabular-nums transition-all duration-300 mr-0.5">{viewers}</span> assistindo agora
          </span>
        </div>

        {isKapwing ? (
          <iframe
            src={videoUrl}
            title="Prévia do Dorama - Envenenada Pelo Seu Amor"
            className="w-full h-full border-0 absolute inset-0"
            allow="autoplay; gyroscope;"
            allowFullScreen
            referrerPolicy="strict-origin"
          />
        ) : isYouTube ? (
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title="Prévia do Dorama"
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <video
              ref={videoRef}
              key={videoUrl}
              poster={VIDEO_THUMBNAIL}
              playsInline
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onClick={handlePlayToggle}
              className="w-full h-full object-cover cursor-pointer"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Botão de play centralizado MAIOR e capa do dorama */}
            {!isPlaying && (
              <div
                onClick={handlePlayToggle}
                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-black/30"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-600/95 text-white flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.65)] border-3 sm:border-4 border-white/95 group-hover:scale-110 transition-transform active:scale-95">
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current translate-x-1" />
                </div>
              </div>
            )}

            {/* Controles simples */}
            <div
              className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-white transition-opacity ${
                isPlaying ? 'opacity-90 group-hover:opacity-100' : 'opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayToggle}
                  className="p-1 hover:text-rose-400 cursor-pointer"
                  aria-label={isPlaying ? 'Pausar' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={handleMuteToggle}
                  className="p-1 hover:text-rose-400 cursor-pointer"
                  aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleFullscreen}
                className="p-1 hover:text-rose-400 cursor-pointer"
                aria-label="Tela cheia"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Seta para baixo */}
      <div className="mt-6 flex justify-center text-rose-500">
        <ChevronDown className="w-9 h-9 sm:w-10 sm:h-10 animate-bounce stroke-[2.5] drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]" />
      </div>
    </section>
  );
};
