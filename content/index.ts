import type { SiteConfig } from '../types';
import {
  siteName,
  logo,
  brandXImage,
  contactEmail,
  phone,
  location,
  socials,
} from './site/identity';
import { hero } from './site/hero';
import { stats } from './site/stats';
import {
  servicesHeader,
  portfolioHeader,
  teamHeader,
  teamIntro,
  footer,
} from './site/sectionHeaders';
import { testimonials } from './home/testimonials';
import { faqs } from './home/faqs';
import { homeSectionCopy } from './home/homeSectionCopy';
import { services } from './services/services';
import { workPrinciples } from './services/workPrinciples';
import { portfolio } from './portfolio/projects';
import { mainPlans } from './pricing/mainPlans';
import { addOns } from './pricing/addOns';

export const INITIAL_CONFIG: SiteConfig = {
  siteName,
  logo,
  brandXImage,
  contactEmail,
  phone,
  location,
  socials,
  hero,
  stats,
  testimonials,
  faqs,
  homeSectionCopy,
  servicesHeader,
  portfolioHeader,
  teamHeader,
  teamIntro,
  footer,
  services,
  workPrinciples,
  portfolio,
  mainPlans,
  addOns,
};

export { SITE_URL } from './i18n/siteUrl';
export { PAGE_META, type PageMetaKey } from './i18n/pageMeta';
export { UI_TEXTS } from './i18n/uiTexts';
