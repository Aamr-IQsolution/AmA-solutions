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

export interface SiteConfig {
  siteName: string;
  logo: string;
  contactEmail: string;
  phone: string;
  socials: SocialChannel[];
  hero: Record<Language, { title: string; subtitle: string }>;
  servicesHeader: Record<Language, SectionContent>;
  portfolioHeader: Record<Language, SectionContent>;
  pricingHeader: Record<Language, SectionContent>;
  webPricingHeader: Record<Language, SectionContent>;
  footer: Record<Language, { copyright: string; credits: string }>;
  services: Service[];
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