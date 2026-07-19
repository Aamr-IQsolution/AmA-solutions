import type { HomeStats } from '../../types';

export const stats: HomeStats = {
    projects: 5,
    clients: 15,
    translations: {
      en: { projectsLabel: "Projects delivered", clientsLabel: "Happy clients" },
      ar: { projectsLabel: "مشاريع منجزة", clientsLabel: "عملاء راضون" },
      nl: { projectsLabel: "Projecten", clientsLabel: "Tevreden klanten" },
    },
};
