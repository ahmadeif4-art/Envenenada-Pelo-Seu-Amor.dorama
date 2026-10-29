/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { DEFAULT_CONFIG } from './constants/initialData';
import { UrgencyHeader } from './components/UrgencyHeader';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { OfferSection } from './components/OfferSection';
import { SalesToast } from './components/SalesToast';

// Lazy loading das seções abaixo da dobra e do modal para carregamento ultrarrápido
const MiniGuarantee = lazy(() =>
  import('./components/MiniGuarantee').then((module) => ({
    default: module.MiniGuarantee,
  }))
);

const TestimonialCarousel = lazy(() =>
  import('./components/TestimonialCarousel').then((module) => ({
    default: module.TestimonialCarousel,
  }))
);

const UpgradeModal = lazy(() =>
  import('./components/UpgradeModal').then((module) => ({
    default: module.UpgradeModal,
  }))
);

export default function App() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleSelectPlan = (plan: 'basic' | 'premium') => {
    setIsUpgradeModalOpen(false);
    const targetUrl =
      plan === 'premium'
        ? DEFAULT_CONFIG.checkoutUrlPremium
        : DEFAULT_CONFIG.checkoutUrlBasic;

    if (targetUrl) {
      const opened = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (!opened) {
        window.location.href = targetUrl;
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* 1. Banner de urgência no topo */}
      <UrgencyHeader />

      {/* Notificações de compra minimalistas (canto superior direito) */}
      <SalesToast />

      {/* Conteúdo principal direto, cinematográfico e sem distrações */}
      <main className="flex-1 pb-12">
        {/* 2. Headline principal + 3. Subheadline — Sinopse + Capa oficial */}
        <HeroSection />

        {/* 4. Seção de vídeo vertical (9:16) com botão central de play e capa */}
        <VideoSection videoUrl={DEFAULT_CONFIG.videoUrl} />

        {/* 5. Oferta principal */}
        <OfferSection onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)} />

        {/* Seção de garantia minúscula (Lazy Loaded) */}
        <Suspense fallback={<div className="h-16" />}>
          <MiniGuarantee />
        </Suspense>

        {/* Carrossel de depoimentos (Lazy Loaded) */}
        <Suspense fallback={<div className="h-64" />}>
          <TestimonialCarousel />
        </Suspense>
      </main>

      {/* 6. Pop-up de upgrade (Lazy Loaded sob demanda) */}
      {isUpgradeModalOpen && (
        <Suspense fallback={null}>
          <UpgradeModal
            isOpen={isUpgradeModalOpen}
            onClose={() => setIsUpgradeModalOpen(false)}
            onSelectPlan={handleSelectPlan}
            extraDoramaTitle={DEFAULT_CONFIG.extraDoramaTitle}
            thirdDoramaTitle={DEFAULT_CONFIG.thirdDoramaTitle}
          />
        </Suspense>
      )}
    </div>
  );
}
