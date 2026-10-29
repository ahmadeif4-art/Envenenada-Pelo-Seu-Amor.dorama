
import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronDown
} from 'lucide-react';
import { VIDEO_THUMBNAIL } from '../constants/initialData';

// URL da VSL hospedada externamente
const VSL_URL =
  'https://videotourl.com/videos/1793270167030-f93d761d-2b35-4a20-b29c-2ee7ecaf0efb.mp4';

interface VideoSectionProps {
  videoUrl: string;
}

export const VideoSection: React.FC<VideoSectionProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers, setViewers] = useState(149);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Contador visual simulado, não representa audiência real
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const shouldIncrease = Math.random() < 0.85;
        const change = shouldIncrease
          ? Math.floor(Math.random() * 4) + 2
          : -1;
        const nextVal = prev + change;
        return nextVal < 148 ? 149 : nextVal;
      });
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  const handlePlayToggle = async () => {
    const video = videoRef.current;
    if (!video || videoError) return;

    if (!video.paused) {
      video.pause();
      return;
    }

    try {
      await video.play();
    } catch {
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const container = containerRef.current;
    if (!container) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch {
      // Alguns navegadores móveis não oferecem
      // tela cheia para elementos personalizados.
    }
  };

  return (
    <section className="py-6 sm:py-8 max-w-xl mx-auto px-4 flex flex-col items-center">

      <h2 className="text-2xl sm:text-3xl font-black text-white text-center font-serif-drama mb-5">
        🎬 Assista uma prévia
      </h2>

      <div
        ref={containerRef}
        className="relative w-full max-w-[300px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-rose-900/50 group select-none"
      >

        {/* Indicador visual existente */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-rose-500/40 text-white px-2.5 py-1 rounded-full shadow-lg pointer-events-none select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-[11px] font-bold tracking-tight">
            <span className="text-white font-price font-black mr-0.5">
              {viewers}
            </span>
            {' '}assistindo agora
          </span>
        </div>

        {/* VSL MP4 EXTERNA */}
        <video
          ref={videoRef}
          src={VSL_URL}
          poster={VIDEO_THUMBNAIL}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => setVideoError(true)}
          onClick={handlePlayToggle}
          className="w-full h-full object-cover cursor-pointer"
        >
          Seu navegador não suporta vídeos HTML5.
        </video>

        {videoError ? (
          <div className="absolute inset-0 z-30 bg-black/90 flex items-center justify-center p-6 text-center text-white text-sm">
            Não foi possível carregar o vídeo.
            Tente novamente mais tarde.
          </div>
        ) : (
          <>
            {/* Botão central */}
            {!isPlaying && (
              <div
                onClick={handlePlayToggle}
                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-black/30"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-600/95 text-white flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.65)] border-4 border-white/95 group-hover:scale-110 transition-transform active:scale-95">
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current translate-x-1" />
                </div>
              </div>
            )}

            {/* Controles do vídeo */}
            <div
              className={`absolute z-10 inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-white transition-opacity ${
                isPlaying
                  ? 'opacity-90 group-hover:opacity-100'
                  : 'opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayToggle}
                  className="p-1 hover:text-rose-400 cursor-pointer"
                  aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleMuteToggle}
                  className="p-1 hover:text-rose-400 cursor-pointer"
                  aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
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

      {/* Seta indicativa */}
      <div className="mt-6 flex justify-center text-rose-500">
        <ChevronDown className="w-9 h-9 sm:w-10 sm:h-10 animate-bounce stroke-[2.5] drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]" />
      </div>

    </section>
  );
};
