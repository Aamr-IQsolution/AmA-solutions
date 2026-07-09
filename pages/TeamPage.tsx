import React from 'react';
import PageHero from '../components/PageHero';
import Team from '../components/Team';
import { useApp } from '../context/AppContext';

const TeamPage: React.FC = () => {
  const { lang } = useApp();

  return (
    <>
      <PageHero
        eyebrow={lang === 'ar' ? 'فريق العمل' : lang === 'nl' ? 'Ons team' : 'Our Team'}
        title={lang === 'ar' ? 'خبرات برمجية وحلول أمنية عالية المستوى في فريق واحد' : lang === 'nl' ? 'Software-engineering en beveiligingsoplossingen van hoog niveau in één team' : 'Software Engineering & High-Level Security Solutions In One Team'}
        subtitle={
          lang === 'ar'
            ? 'فريق يجمع بين الدقة الهندسية والخبرة العملية لتقديم حلول رقمية متكاملة.'
            : lang === 'nl'
            ? 'Een team dat technische precisie en praktijkervaring combineert voor complete digitale oplossingen.'
            : 'A hybrid team combining engineering precision and practical growth expertise.'
        }
      />
      <Team />
    </>
  );
};

export default TeamPage;
