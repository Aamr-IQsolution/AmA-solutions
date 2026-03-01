/**
 * قسم فريق العمل (Team Section).
 * يعرض هذا القسم أعضاء الفريق وخبراتهم.
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';

const Team: React.FC = () => {
  const { lang, config } = useApp();
  const teamData = config.team || [];
  const header = config.teamHeader || { en: {}, ar: {}, nl: {} };

  return (
    <section id="team" className="py-20 bg-gray-900/20 text-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={header[lang]?.title || ''}
          highlight={header[lang]?.highlight || ''}
        />
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-1 justify-center">
          {teamData.map(member => {
            const { name, title, bio } = member.translations[lang] || {};
            return (
              <div key={member.id} className="glass-card-dark p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
                <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full animate-pulse-slow"></div>
                  <img 
                    src={member.image}
                    alt={name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-gray-800 shadow-lg"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white">{name}</h3>
                  <p className="text-cyan-400 font-semibold text-lg mb-4">{title}</p>
                  <p className="text-gray-300 leading-relaxed">
                    {bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
       <style jsx>{`
        .glass-card-dark {
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Team;
