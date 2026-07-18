import React from 'react';
import PageHero from '../components/PageHero';
import Team from '../components/Team';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import { useApp } from '../context/AppContext';
import { PAGE_META } from '../constants';

const TeamPage: React.FC = () => {
  const { lang } = useApp();
  const meta = PAGE_META.team[lang];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/team" />
      <PageHero
        eyebrow={
          lang === 'ar' ? 'فريقنا' : lang === 'nl' ? 'Ons Team' : 'Our Team'
        }
        title={
          lang === 'ar'
            ? 'خبرة هندسية مباشرة بدون وسطاء'
            : lang === 'nl'
              ? 'Directe Technische Expertise, Zonder Tussenpersonen'
              : 'Direct Engineering Expertise, No Middlemen'
        }
        subtitle={
          lang === 'ar'
            ? 'تواصل مباشر مع مهندس البرمجيات الذي ينفّذ مشروعك فعلياً، من أول فكرة حتى الإطلاق.'
            : lang === 'nl'
              ? 'Directe communicatie met de software-engineer die uw project daadwerkelijk bouwt, van eerste idee tot lancering.'
              : 'Direct communication with the software engineer who actually builds your project, from first idea to launch.'
        }
      />
      <Team />
      <CTASection />
    </>
  );
};

export default TeamPage;
