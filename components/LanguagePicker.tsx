/**
 * شاشة اختيار اللغة (Language Picker Screen).
 * تظهر هذه الشاشة كأول واجهة للمستخدم عند زيارة الموقع للمرة الأولى. 
 * تتيح للمستخدم اختيار لغته المفضلة (العربية، الإنجليزية، الهولندية) لتخصيص تجربة 
 * التصفح بالكامل، وتتميز بتصميم بصري جذاب يضم أعلام الدول وتأثيرات حركية.
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

interface LanguagePickerProps {
  onSelect: () => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ onSelect }) => {
  const { setLang, config } = useApp();

  const handleSelection = (l: Language) => {
    setLang(l);
    onSelect();
  };

  const languages = [
    { 
      code: 'ar' as Language, 
      label: 'العربية', 
      sub: 'أهلاً بك في عالم الإبداع الرقمي', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg' 
    },
    { 
      code: 'en' as Language, 
      label: 'English', 
      sub: 'Welcome to digital excellence', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg' 
    },
    { 
      code: 'nl' as Language, 
      label: 'Nederlands', 
      sub: 'Welkom bij digitale uitmuntendheid', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg' 
    }
  ];

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050510] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Background Animated Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-cyan-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-pink-600/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-top duration-1000">
          <div className="inline-block relative mb-6 md:mb-8 group">
            <div className="absolute -inset-4 ama-gradient rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img src={config.logo} alt="Logo" className="relative h-20 w-20 md:h-28 md:w-28 rounded-full border-2 border-white/20 shadow-2xl mx-auto object-cover bg-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 ama-text-gradient uppercase tracking-tighter">
            Choose Your Language
          </h1>
          <p className="text-gray-400 text-base md:text-lg font-medium">إختر لغتك المفضلة للمتابعة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {languages.map((lang, idx) => (
            <button
              key={lang.code}
              onClick={() => handleSelection(lang.code)}
              className="group relative glass-card p-6 md:p-8 rounded-[30px] md:rounded-[40px] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex flex-col items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-cyan-400 transition-colors shadow-xl bg-black/20">
                  <img src={lang.flag} alt={lang.label} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:ama-text-gradient transition-colors">
                    {lang.label}
                  </h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed px-2">
                    {lang.sub}
                  </p>
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-[30px] md:rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center animate-in fade-in duration-1000 delay-500">
           <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.5em]">{config.siteName} &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default LanguagePicker;
