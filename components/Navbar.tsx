import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const { lang, config, setLang } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const texts = UI_TEXTS[lang];

  const navLinks = [
    { id: 'home', text: texts.home },
    { id: 'services', text: texts.services },
    { id: 'team', text: texts.team },
    { id: 'portfolio', text: texts.portfolio },
    { id: 'web-pricing', text: texts.webPrices },
    { id: 'pricing', text: texts.prices },
    { id: 'contact', text: texts.contact },
  ];

  const LanguageSwitcher = () => {
    const languages: { code: Language; name: string; flag: string }[] = [
      { code: 'ar', name: 'AR', flag: '/assets/Flag_of_Saudi_Arabia.svg' },
      { code: 'en', name: 'EN', flag: '/assets/gb.svg' },
      { code: 'nl', name: 'NL', flag: '/assets/nl.svg' },
    ];

    return (
      <div className="flex items-center space-x-2" dir="ltr">
        {languages.map(l => (
          <button
            key={l.code}
            onClick={() => {
              setLang(l.code);
            }}
            className={`w-12 h-8 rounded-md bg-cover bg-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg ${
              lang === l.code ? 'ring-2 ring-cyan-400' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundImage: `url(${l.flag})` }}
            aria-label={`Switch to ${l.name} language`}
          />
        ))}
      </div>
    );
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={config.logo} alt={`${config.siteName} Logo`} className="h-12 w-12 rounded-full object-cover"/>
            <span className="self-center text-2xl font-black text-white whitespace-nowrap">{config.siteName}</span>
          </a>
          
          <div className="hidden lg:flex items-center space-x-8">
            {/* Desktop Navigation Links */}
            <nav className="flex items-center space-x-8">
              {navLinks.map(link => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="font-bold text-lg text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </nav>

            {/* Desktop Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (collapsible) */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 bg-opacity-90">
          <div className="flex flex-col items-center py-6 space-y-5">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center space-y-5">
              {navLinks.map(link => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="font-bold text-xl text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </nav>
            
            <hr className="w-2/3 border-gray-700 my-2" />

            {/* Mobile Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
