import type { IconType } from 'react-icons';
import {
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

/** Exact-match mapping from constants.ts technology names to Simple Icons. */
export const TECH_ICON_MAP: Record<string, IconType> = {
  'Next.js 16': SiNextdotjs,
  'React 19': SiReact,
  TypeScript: SiTypescript,
  Supabase: SiSupabase,
  'Tailwind CSS': SiTailwindcss,
  Vercel: SiVercel,
};

export function getTechIcon(name: string): IconType | undefined {
  return TECH_ICON_MAP[name];
}
