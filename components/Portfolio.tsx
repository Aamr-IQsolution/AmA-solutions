/**
 * قسم معرض الأعمال (Portfolio Section).
 * يعرض هذا القسم نماذج من المشاريع السابقة والتحولات الرقمية الناجحة. 
 * تتميز البطاقات بصور جذابة وتأثيرات حركية عند مرور الفأرة، مع إمكانية الضغط على 
 * أي مشروع للانتقال إلى الرابط الخاص به (إذا تم تحديده من لوحة التحكم).
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';

const Portfolio: React.FC = () => {
  const { lang, config } = useApp();
  const t = UI_TEXTS[lang];

  const renderTitle = () => {
    const header = config.portfolioHeader[lang];
    const fullTitle = header.title;
    const highlight = header.highlight;
    
    if (highlight && fullTitle.includes(highlight)) {
      const parts = fullTitle.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="ama-text-gradient">{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return fullTitle;
  };

  return (
    <section id="portfolio" className="py-32 bg-[#08081a]/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            {renderTitle()}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{config.portfolioHeader[lang].description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {config.portfolio.map((project) => {
            const ProjectWrapper = project.link ? 'a' : 'div';
            const wrapperProps = project.link ? { 
              href: project.link, 
              target: "_blank", 
              rel: "noopener noreferrer" 
            } : {};

            return (
              <div key={project.id} className="group relative rounded-[40px] overflow-hidden bg-black border border-white/5">
                <ProjectWrapper {...wrapperProps} className="block relative h-[450px] overflow-hidden cursor-pointer">
                  <img 
                    src={project.image} 
                    alt={project.translations[lang].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-10">
                     <div className="inline-block px-4 py-1 mb-4 text-[10px] font-black tracking-widest text-black ama-gradient rounded-full uppercase">
                      {project.category}
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">{project.translations[lang].title}</h3>
                    <p className="text-gray-300 mb-6 max-w-md line-clamp-2">{project.translations[lang].description}</p>
                    <div className="flex items-center gap-3 text-white font-black uppercase text-xs tracking-[0.2em] group-hover:gap-5 transition-all">
                      {lang === 'ar' ? 'استكشاف المشروع' : 'Explore Project'} <i className={`fa-solid fa-chevron-${lang === 'ar' ? 'left' : 'right'} ama-text-gradient`}></i>
                    </div>
                  </div>
                </ProjectWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;