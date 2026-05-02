import React from 'react';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import { useApp } from '../context/AppContext';

const ContactPage: React.FC = () => {
  const { lang } = useApp();

  return (
    <>
      <PageHero
        eyebrow={lang === 'ar' ? 'تواصل معنا' : lang === 'nl' ? 'Contact' : 'Contact'}
        title={lang === 'ar' ? 'لنبدأ مشروعك القادم' : lang === 'nl' ? 'Laten we jouw project starten' : "Let's Build Your Next Project"}
        subtitle={
          lang === 'ar'
            ? 'شاركنا فكرتك، وسنحوّلها إلى تجربة رقمية متكاملة بخطة تنفيذ واضحة.'
            : lang === 'nl'
            ? 'Deel jouw idee en wij vertalen het naar een complete digitale ervaring met een helder plan.'
            : 'Share your idea and we will turn it into a complete digital experience with a clear execution plan.'
        }
      />
      <Contact />
    </>
  );
};

export default ContactPage;
