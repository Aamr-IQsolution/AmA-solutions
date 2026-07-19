import type { MainPlan } from '../../types';

export const isOneTimePlan = (plan: MainPlan) => plan.id === 'main-2';

export const getFeatureIconClass = (planId: string, index: number): string => {
  switch (planId) {
    case 'main-1': {
      const icons = [
        'fa-solid fa-file-lines',
        'fa-solid fa-image',
        'fa-solid fa-icons',
        'fa-solid fa-envelope-open-text',
        'fa-solid fa-mobile-screen',
        'fa-solid fa-gauge-high',
        'fa-solid fa-magnifying-glass-chart',
        'fa-solid fa-server',
      ];
      return icons[index] ?? 'fa-solid fa-check';
    }
    case 'main-2': {
      const icons = [
        'fa-solid fa-layer-group',
        'fa-solid fa-language',
        'fa-solid fa-bolt',
        'fa-solid fa-shield-halved',
        'fa-solid fa-mobile-screen',
        'fa-solid fa-comments',
        'fa-solid fa-crown',
        'fa-solid fa-puzzle-piece',
        'fa-solid fa-chart-line',
        'fa-solid fa-circle-info',
      ];
      return icons[index] ?? 'fa-solid fa-check';
    }
    case 'main-3': {
      const icons = [
        'fa-solid fa-cart-shopping',
        'fa-solid fa-laptop-code',
        'fa-solid fa-gears',
        'fa-solid fa-sitemap',
        'fa-solid fa-plug',
        'fa-solid fa-table-columns',
        'fa-solid fa-bug',
        'fa-solid fa-database',
        'fa-solid fa-headset',
      ];
      return icons[index] ?? 'fa-solid fa-check';
    }
    default:
      return 'fa-solid fa-check';
  }
};
