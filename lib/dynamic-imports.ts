import dynamic from 'next/dynamic';

export const DynamicFloatingMomos = dynamic(
  () => import('@/components/animations/SpecialEffects').then(mod => ({ default: mod.FloatingMomos })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const DynamicGoldParticles = dynamic(
  () => import('@/components/animations/SpecialEffects').then(mod => ({ default: mod.GoldParticles })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const DynamicAnimatedModal = dynamic(
  () => import('@/components/animations/ModalAnimations').then(mod => ({ default: mod.AnimatedModal })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const DynamicSlideUpModal = dynamic(
  () => import('@/components/animations/ModalAnimations').then(mod => ({ default: mod.SlideUpModal })),
  {
    loading: () => null,
    ssr: false,
  }
);
