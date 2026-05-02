/**
 * هذا الملف يحتوي على كافة تعريفات الأنواع (Interfaces & Types) المستخدمة في المشروع.
 */
export type Language = 'en' | 'ar' | 'nl';

export interface Translation {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

export interface Service {
  id: string;
  icon: string;
  translations: Record<Language, { 
    name: string; 
    description: string;
    expertDetails: string; // الحقل الجديد للشرح المعمق
  }>;
}

export interface Plan {
  id: string;
  price: number;
  isPopular: boolean;
  translations: Record<Language, { 
    name: string; 
    features: string[]; 
    buttonText: string;
  }>;
}

export interface Project {
  id: string;
  image: string;
  category: string;
  link?: string;
  translations: Record<Language, { title: string; description: string }>;
}

export interface SectionContent {
  title: string;
  highlight: string;
  description?: string;
}

export interface SocialChannel {
  id: string;
  platform: string;
  icon: string;
  link: string;
}

export interface HomeStats {
  projects: number;
  clients: number;
  translations: Record<Language, { projectsLabel: string; clientsLabel: string }>;
}

export interface TestimonialEntry {
  initials: string;
  translations: Record<Language, { name: string; role: string; quote: string }>;
}

export interface FaqEntry {
  translations: Record<Language, { question: string; answer: string }>;
}

export interface HomeSectionCopy {
  pricing: Record<Language, {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    seeAll: string;
    popularBadge: string;
    orderNow: string;
  }>;
  testimonials: Record<Language, {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
  }>;
  faq: Record<Language, {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
  }>;
  cta: Record<Language, { title: string; subtitle: string; button: string }>;
}

export interface TeamMember {
  id: string;
  image: string;
  translations: Record<Language, { name: string; title: string; bio: string }>;
}

export interface SiteConfig {
  siteName: string;
  logo: string;
  contactEmail: string;
  phone: string;
  socials: SocialChannel[];
  hero: Record<Language, { title: string; subtitle: string }>;
  stats: HomeStats;
  testimonials: TestimonialEntry[];
  faqs: FaqEntry[];
  homeSectionCopy: HomeSectionCopy;
  servicesHeader: Record<Language, SectionContent>;
  portfolioHeader: Record<Language, SectionContent>;
  pricingHeader: Record<Language, SectionContent>;
  webPricingHeader: Record<Language, SectionContent>;
  teamHeader: Record<Language, SectionContent>;
  footer: Record<Language, { copyright: string; credits: string }>;
  services: Service[];
  team: TeamMember[];
  portfolio: Project[];
  plans: Plan[];
  webPlans: Plan[];
}

export type UserRole = 'OWNER' | 'ADMIN' | 'MODERATOR';

export interface Permissions {
  canEditContent: boolean;
  canDeleteContent: boolean;
  canManageUsers: boolean;
  canViewStats: boolean;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  isActive: boolean;
  permissions: Permissions;
  createdAt: string;
}