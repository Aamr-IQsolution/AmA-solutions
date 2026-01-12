
/**
 * لوحة التحكم الكاملة (Admin Dashboard).
 * تم إصلاح هذا الملف ليشمل كافة الأقسام والتبويبات المطلوبة للتحكم الكامل.
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TEXTS } from '../constants';
import { Language, SiteConfig, Service, Project, User, UserRole, Plan, SocialChannel } from '../types';

const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { lang, setLang, config, setConfig, setUser, user, users, setUsers, isRTL } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'sections' | 'services' | 'portfolio' | 'plans' | 'web-plans' | 'users' | 'footer'>('general');
  const [confirmDelete, setConfirmDelete] = useState<{ id: string, type: 'service' | 'project' | 'user' | 'plan' | 'web-plan' | 'social' } | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('MODERATOR');

  const t = UI_TEXTS[lang];

  const handleLogout = () => setUser(null);

  const updateConfig = (newPartial: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newPartial }));
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const performDelete = () => {
    if (!confirmDelete) return;

    if (confirmDelete.type === 'service') {
      setConfig(prev => ({ ...prev, services: prev.services.filter(s => s.id !== confirmDelete.id) }));
    } else if (confirmDelete.type === 'project') {
      setConfig(prev => ({ ...prev, portfolio: prev.portfolio.filter(p => p.id !== confirmDelete.id) }));
    } else if (confirmDelete.type === 'user') {
      setUsers(prev => prev.filter(u => u.id !== confirmDelete.id));
    } else if (confirmDelete.type === 'plan') {
      setConfig(prev => ({ ...prev, plans: prev.plans.filter(p => p.id !== confirmDelete.id) }));
    } else if (confirmDelete.type === 'web-plan') {
      setConfig(prev => ({ ...prev, webPlans: prev.webPlans.filter(p => p.id !== confirmDelete.id) }));
    } else if (confirmDelete.type === 'social') {
      setConfig(prev => ({ ...prev, socials: prev.socials.filter(s => s.id !== confirmDelete.id) }));
    }
    setConfirmDelete(null);
    handleSave();
  };

  const addService = () => {
    const newService: Service = {
      id: `svc-${Date.now()}`,
      icon: 'fa-star',
      translations: {
        en: { name: 'New Service', description: 'Description here', expertDetails: 'Deep explanation here' },
        ar: { name: 'خدمة جديدة', description: 'وصف الخدمة هنا', expertDetails: 'شرح معمق هنا' },
        nl: { name: 'Nieuwe Dienst', description: 'Beschrijving hier', expertDetails: 'Diepgaande uitleg hier' }
      }
    };
    setConfig(prev => ({ ...prev, services: [...prev.services, newService] }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: `prj-${Date.now()}`,
      image: 'https://picsum.photos/600/400',
      category: 'Web',
      link: '',
      translations: {
        en: { title: 'New Project', description: 'Project details' },
        ar: { title: 'مشروع جديد', description: 'تفاصيل المشروع' },
        nl: { title: 'Nieuw Project', description: 'Project details' }
      }
    };
    setConfig(prev => ({ ...prev, portfolio: [...prev.portfolio, newProject] }));
  };

  const addPlan = (type: 'marketing' | 'web') => {
    const newPlan: Plan = {
      id: `${type}-${Date.now()}`,
      price: 0,
      isPopular: false,
      translations: {
        en: { name: 'New Plan', buttonText: 'Buy Now', features: ['Feature 1'] },
        ar: { name: 'باقة جديدة', buttonText: 'اشترِ الآن', features: ['ميزة 1'] },
        nl: { name: 'Nieuw Plan', buttonText: 'Nu kopen', features: ['Functie 1'] }
      }
    };
    if (type === 'marketing') {
      setConfig(prev => ({ ...prev, plans: [...prev.plans, newPlan] }));
    } else {
      setConfig(prev => ({ ...prev, webPlans: [...prev.webPlans, newPlan] }));
    }
  };

  const addSocialChannel = () => {
    const newChannel: SocialChannel = {
      id: `soc-${Date.now()}`,
      platform: 'New Platform',
      icon: 'fa-globe',
      link: 'https://'
    };
    setConfig(prev => ({ ...prev, socials: [...prev.socials, newChannel] }));
  };

  const updatePlan = (id: string, updates: Partial<Plan>, isWeb: boolean = false) => {
    const key = isWeb ? 'webPlans' : 'plans';
    setConfig(prev => ({
      ...prev,
      [key]: prev[key].map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;
    const newUser: User = {
      id: Date.now().toString(),
      username: newUsername,
      password: newPassword,
      role: newRole,
      isActive: true,
      createdAt: new Date().toISOString(),
      permissions: {
        canEditContent: true,
        canDeleteContent: newRole !== 'MODERATOR',
        canManageUsers: newRole === 'OWNER',
        canViewStats: true
      }
    };
    setUsers(prev => [...prev, newUser]);
    setNewUsername('');
    setNewPassword('');
    setShowAddUser(false);
    handleSave();
  };

  return (
    <div className={`min-h-screen bg-[#050510] flex flex-col md:flex-row text-white font-cairo overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-5">
           <div className="ama-gradient px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20">
              <i className="fa-solid fa-circle-check text-black text-xl"></i>
              <span className="text-black font-black uppercase tracking-widest text-sm">{t.save}</span>
           </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}></div>
          <div className="relative glass-card border border-white/10 p-8 rounded-[32px] max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
             <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fa-solid fa-triangle-exclamation text-3xl text-red-500"></i></div>
             <h3 className="text-2xl font-black mb-2">{t.confirmDelete}</h3>
             <div className="flex gap-4">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-4 rounded-2xl bg-white/5 font-bold transition-all uppercase text-[10px] tracking-widest">{t.cancel}</button>
                <button onClick={performDelete} className="flex-1 py-4 rounded-2xl bg-red-600 font-bold transition-all uppercase text-[10px] tracking-widest">{t.yesDelete}</button>
             </div>
          </div>
        </div>
      )}

      <aside className="w-full md:w-80 bg-[#08081a] border-r border-white/5 p-8 flex flex-col shrink-0 z-30">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-12 h-12 ama-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20"><i className="fa-solid fa-gauge-high text-black text-xl"></i></div>
          <div><h2 className="font-black text-xl tracking-tight ama-text-gradient uppercase">{config.siteName}</h2><p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t.adminPanel}</p></div>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          {[
            { id: 'general', icon: 'fa-gears', label: t.general },
            { id: 'hero', icon: 'fa-wand-magic-sparkles', label: t.visuals },
            { id: 'sections', icon: 'fa-heading', label: t.sectionTitles },
            { id: 'services', icon: 'fa-briefcase', label: t.services },
            { id: 'plans', icon: 'fa-bullhorn', label: t.prices },
            { id: 'web-plans', icon: 'fa-laptop-code', label: t.webPrices },
            { id: 'portfolio', icon: 'fa-images', label: t.portfolio },
            { id: 'footer', icon: 'fa-window-maximize', label: t.footerSettings },
            { id: 'users', icon: 'fa-user-shield', label: t.users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border ${
                activeTab === tab.id 
                ? 'ama-gradient text-black border-transparent shadow-lg shadow-cyan-500/10' 
                : 'text-gray-500 border-transparent hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <i className={`fa-solid ${tab.icon} w-5`}></i>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-4 pt-8 border-t border-white/5">
          <button onClick={() => onBack()} className="w-full flex items-center gap-4 px-5 py-4 text-cyan-500 hover:bg-cyan-500/10 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest mb-2"><i className="fa-solid fa-home"></i> {t.home}</button>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 text-pink-500 hover:bg-pink-500/10 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest"><i className="fa-solid fa-power-off"></i> {t.logout}</button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-12 overflow-y-auto max-h-screen relative bg-[#050510]">
        <header className="mb-12 flex justify-between items-center sticky top-0 bg-[#050510]/80 backdrop-blur-xl z-40 py-4 -mx-4 px-4 md:-mx-12 md:px-12 border-b border-white/5">
           <h1 className="text-2xl font-black text-white capitalize">{activeTab}</h1>
           <div className="flex gap-4">
              <select value={lang} onChange={(e) => setLang(e.target.value as Language)} className="bg-white/5 border border-white/10 rounded-full px-4 text-xs font-black text-white outline-none">
                <option value="ar">العربية</option><option value="en">EN</option><option value="nl">NL</option>
              </select>
              <button onClick={handleSave} className="ama-gradient px-6 py-2 rounded-full text-black font-black uppercase text-[10px] tracking-widest shadow-lg shadow-cyan-500/20">{t.save}</button>
           </div>
        </header>

        <div className="glass-card rounded-[40px] p-6 md:p-10 border border-white/5 shadow-2xl bg-white/2">
          
          {activeTab === 'general' && (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 border-b border-white/5 pb-12">
                <div className="space-y-4">
                  <div className="space-y-1"><label className="admin-label">{t.siteName}</label><input value={config.siteName} onChange={(e) => updateConfig({ siteName: e.target.value })} className="admin-input" /></div>
                  <div className="space-y-1"><label className="admin-label">{t.logoUrl}</label><input value={config.logo} onChange={(e) => updateConfig({ logo: e.target.value })} className="admin-input" /></div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1"><label className="admin-label">{t.email}</label><input value={config.contactEmail} onChange={(e) => updateConfig({ contactEmail: e.target.value })} className="admin-input" /></div>
                  <div className="space-y-1"><label className="admin-label">{t.whatsapp}</label><input value={config.phone} onChange={(e) => updateConfig({ phone: e.target.value })} className="admin-input" /></div>
                </div>
              </div>

              {/* Social Channels Manager */}
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-black uppercase tracking-tight text-white">{t.socials}</h3>
                   <button onClick={addSocialChannel} className="ama-gradient px-6 py-2.5 rounded-xl font-black text-black uppercase tracking-widest text-[10px]"><i className="fa-solid fa-plus mr-2"></i> {t.addSocial}</button>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  {config.socials.map((soc) => (
                    <div key={soc.id} className="p-6 bg-white/5 rounded-3xl border border-white/5 relative group animate-in zoom-in duration-300">
                      <button onClick={() => setConfirmDelete({ id: soc.id, type: 'social' })} className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"><i className="fa-solid fa-xmark text-xs"></i></button>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1"><label className="admin-label-xs text-[9px]">{t.platform}</label>
                        <input value={soc.platform} onChange={(e) => updateConfig({ socials: config.socials.map(s => s.id === soc.id ? { ...s, platform: e.target.value } : s) })} className="admin-input !py-2.5 !px-4" /></div>
                        <div className="space-y-1"><label className="admin-label-xs text-[9px]">{t.icon}</label>
                        <input value={soc.icon} onChange={(e) => updateConfig({ socials: config.socials.map(s => s.id === soc.id ? { ...s, icon: e.target.value } : s) })} className="admin-input !py-2.5 !px-4" /></div>
                        <div className="col-span-2 space-y-1"><label className="admin-label-xs text-[9px]">{t.link}</label>
                        <input value={soc.link} onChange={(e) => updateConfig({ socials: config.socials.map(s => s.id === soc.id ? { ...s, link: e.target.value } : s) })} className="admin-input !py-2.5 !px-4" /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-8">
              {(['ar', 'en', 'nl'] as Language[]).map(l => (
                <div key={l} className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                  <h3 className="font-black uppercase text-xs text-cyan-400">{l} Hero Content</h3>
                  <div className="space-y-1"><label className="admin-label-xs text-[9px]">{t.mainTitle}</label>
                  <input value={config.hero[l].title} onChange={(e) => updateConfig({ hero: { ...config.hero, [l]: { ...config.hero[l], title: e.target.value } } })} className="admin-input" /></div>
                  <div className="space-y-1"><label className="admin-label-xs text-[9px]">{t.description}</label>
                  <textarea value={config.hero[l].subtitle} onChange={(e) => updateConfig({ hero: { ...config.hero, [l]: { ...config.hero[l], subtitle: e.target.value } } })} className="admin-input h-24" /></div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-12">
              {(['ar', 'en', 'nl'] as Language[]).map(l => (
                <div key={l} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-8">
                  <h3 className="font-black uppercase text-sm text-cyan-400">{l} Section Headers</h3>
                  {[
                    { key: 'servicesHeader', label: t.services },
                    { key: 'portfolioHeader', label: t.portfolio },
                    { key: 'pricingHeader', label: t.prices },
                    { key: 'webPricingHeader', label: t.webPrices }
                  ].map(sec => (
                    <div key={sec.key} className="space-y-4 pt-6 border-t border-white/5 first:border-0 first:pt-0">
                      <p className="text-xs font-black uppercase text-gray-500">{sec.label}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-1"><label className="admin-label-xs text-[9px]">{t.mainTitle}</label>
                         <input value={(config as any)[sec.key][l].title} onChange={(e) => updateConfig({ [sec.key]: { ...(config as any)[sec.key], [l]: { ...(config as any)[sec.key][l], title: e.target.value } } })} className="admin-input" /></div>
                         <div className="space-y-1"><label className="admin-label-xs text-[9px]">{t.highlightWord}</label>
                         <input value={(config as any)[sec.key][l].highlight} onChange={(e) => updateConfig({ [sec.key]: { ...(config as any)[sec.key], [l]: { ...(config as any)[sec.key][l], highlight: e.target.value } } })} className="admin-input" /></div>
                      </div>
                      <div className="space-y-1"><label className="admin-label-xs text-[9px]">{t.description}</label>
                      <textarea value={(config as any)[sec.key][l].description || ''} onChange={(e) => updateConfig({ [sec.key]: { ...(config as any)[sec.key], [l]: { ...(config as any)[sec.key][l], description: e.target.value } } })} className="admin-input h-20" /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-10">
              <button onClick={addService} className="ama-gradient px-8 py-4 rounded-2xl font-black text-black uppercase tracking-widest text-xs"><i className="fa-solid fa-plus mr-2"></i> {t.addService}</button>
              <div className="space-y-6">
                {config.services.map(svc => (
                  <div key={svc.id} className="p-8 border border-white/10 rounded-[32px] bg-white/2 relative group">
                    <button onClick={() => setConfirmDelete({ id: svc.id, type: 'service' })} className="absolute top-6 right-6 w-10 h-10 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="fa-solid fa-trash"></i></button>
                    <div className="grid md:grid-cols-1 gap-6">
                      <div className="space-y-2 max-w-xs"><label className="admin-label">Icon (FontAwesome)</label><input value={svc.icon} onChange={(e) => updateConfig({ services: config.services.map(s => s.id === svc.id ? { ...s, icon: e.target.value } : s) })} className="admin-input" /></div>
                      
                      <div className="grid lg:grid-cols-3 gap-6">
                        {(['ar', 'en', 'nl'] as Language[]).map(l => (
                          <div key={l} className="space-y-4 p-4 bg-black/20 rounded-2xl border border-white/5">
                             <p className="text-[9px] font-black uppercase text-gray-500">{l} Content</p>
                             <div className="space-y-1">
                                <label className="admin-label-xs text-[9px]">Service Name</label>
                                <input value={svc.translations[l].name} onChange={(e) => updateConfig({ services: config.services.map(s => s.id === svc.id ? { ...s, translations: { ...s.translations, [l]: { ...s.translations[l], name: e.target.value } } } : s) })} className="admin-input mb-2" />
                             </div>
                             <div className="space-y-1">
                                <label className="admin-label-xs text-[9px]">Brief Description</label>
                                <textarea value={svc.translations[l].description} onChange={(e) => updateConfig({ services: config.services.map(s => s.id === svc.id ? { ...s, translations: { ...s.translations, [l]: { ...s.translations[l], description: e.target.value } } } : s) })} className="admin-input h-20" />
                             </div>
                             <div className="space-y-1">
                                <label className="admin-label-xs text-[9px] text-cyan-400">{t.expertDetails}</label>
                                <textarea value={svc.translations[l].expertDetails} onChange={(e) => updateConfig({ services: config.services.map(s => s.id === svc.id ? { ...s, translations: { ...s.translations, [l]: { ...s.translations[l], expertDetails: e.target.value } } } : s) })} className="admin-input h-32 border-cyan-500/20" />
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-10">
              <button onClick={addProject} className="ama-gradient px-8 py-4 rounded-2xl font-black text-black uppercase tracking-widest text-xs"><i className="fa-solid fa-plus mr-2"></i> {t.addProject}</button>
              <div className="space-y-12">
                {config.portfolio.map(prj => (
                  <div key={prj.id} className="p-8 border border-white/10 rounded-[32px] bg-white/2 relative">
                    <button onClick={() => setConfirmDelete({ id: prj.id, type: 'project' })} className="absolute top-6 right-6 w-10 h-10 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="fa-solid fa-trash"></i></button>
                    <div className="grid md:grid-cols-3 gap-8 mb-6">
                      <div className="space-y-1"><label className="admin-label">{t.imageUrl}</label><input value={prj.image} onChange={(e) => updateConfig({ portfolio: config.portfolio.map(p => p.id === prj.id ? { ...p, image: e.target.value } : p) })} className="admin-input" /></div>
                      <div className="space-y-1"><label className="admin-label">{t.category}</label><input value={prj.category} onChange={(e) => updateConfig({ portfolio: config.portfolio.map(p => p.id === prj.id ? { ...p, category: e.target.value } : p) })} className="admin-input" /></div>
                      <div className="space-y-1"><label className="admin-label">{t.projectLink}</label><input value={prj.link || ''} placeholder="https://..." onChange={(e) => updateConfig({ portfolio: config.portfolio.map(p => p.id === prj.id ? { ...p, link: e.target.value } : p) })} className="admin-input" /></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      {(['ar', 'en', 'nl'] as Language[]).map(l => (
                        <div key={l} className="p-4 bg-black/20 rounded-2xl border border-white/5 space-y-4">
                           <p className="text-[9px] font-black uppercase text-gray-500">{l} Content</p>
                           <input value={prj.translations[l].title} onChange={(e) => updateConfig({ portfolio: config.portfolio.map(p => p.id === prj.id ? { ...p, translations: { ...p.translations, [l]: { ...p.translations[l], title: e.target.value } } } : p) })} className="admin-input" placeholder="Title" />
                           <textarea value={prj.translations[l].description} onChange={(e) => updateConfig({ portfolio: config.portfolio.map(p => p.id === prj.id ? { ...p, translations: { ...p.translations, [l]: { ...p.translations[l], description: e.target.value } } } : p) })} className="admin-input h-20" placeholder="Description" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'plans' || activeTab === 'web-plans') && (
            <div className="space-y-10">
              <button onClick={() => addPlan(activeTab === 'plans' ? 'marketing' : 'web')} className="ama-gradient px-8 py-4 rounded-2xl font-black text-black uppercase tracking-widest text-xs"><i className="fa-solid fa-plus mr-2"></i> {t.addPlan}</button>
              <div className="space-y-12">
                {(activeTab === 'plans' ? config.plans : config.webPlans).map((p) => (
                  <div key={p.id} className="p-8 border border-white/10 rounded-[40px] bg-white/2 relative group">
                    <button onClick={() => setConfirmDelete({ id: p.id, type: activeTab === 'plans' ? 'plan' : 'web-plan' })} className="absolute top-6 right-6 w-10 h-10 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><i className="fa-solid fa-trash"></i></button>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-2"><label className="admin-label">Price ({t.currency})</label><input type="number" value={p.price} onChange={(e) => updatePlan(p.id, { price: Number(e.target.value) }, activeTab === 'web-plans')} className="admin-input" /></div>
                      <div className="flex items-center gap-4 pt-6">
                         <input type="checkbox" checked={p.isPopular} onChange={(e) => updatePlan(p.id, { isPopular: e.target.checked }, activeTab === 'web-plans')} className="w-6 h-6 rounded bg-black/20" />
                         <label className="admin-label !mb-0">{t.isPopular}</label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      {(['ar', 'en', 'nl'] as Language[]).map(l => (
                        <div key={l} className="space-y-4 p-4 bg-black/20 rounded-2xl border border-white/5">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{l} Content</p>
                          <input value={p.translations[l].name} onChange={(e) => updatePlan(p.id, { translations: { ...p.translations, [l]: { ...p.translations[l], name: e.target.value } } }, activeTab === 'web-plans')} className="admin-input" />
                          <textarea value={p.translations[l].features.join('\n')} onChange={(e) => updatePlan(p.id, { translations: { ...p.translations, [l]: { ...p.translations[l], features: e.target.value.split('\n') } } }, activeTab === 'web-plans')} className="admin-input h-32" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8">
              {(['ar', 'en', 'nl'] as Language[]).map(l => (
                <div key={l} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="font-black uppercase text-xs text-cyan-400">{l} Footer Controls</h3>
                  <div className="space-y-1"><label className="admin-label">{t.copyrightText}</label><input value={config.footer[l].copyright} onChange={(e) => updateConfig({ footer: { ...config.footer, [l]: { ...config.footer[l], copyright: e.target.value } } })} className="admin-input" /></div>
                  <div className="space-y-1"><label className="admin-label">{t.creditsText}</label><input value={config.footer[l].credits} onChange={(e) => updateConfig({ footer: { ...config.footer, [l]: { ...config.footer[l], credits: e.target.value } } })} className="admin-input" /></div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-10">
              <button onClick={() => setShowAddUser(true)} className="ama-gradient px-8 py-4 rounded-2xl font-black text-black uppercase tracking-widest text-xs"><i className="fa-solid fa-user-plus mr-2"></i> {t.addUser}</button>
              
              {showAddUser && (
                <div className="p-8 border border-cyan-500/20 rounded-[32px] bg-cyan-500/5 animate-in slide-in-from-top-4 duration-300">
                  <form onSubmit={handleAddUser} className="grid md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-1"><label className="admin-label">{t.username}</label><input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="admin-input" required /></div>
                    <div className="space-y-1"><label className="admin-label">Password</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="admin-input" required /></div>
                    <div className="space-y-1"><label className="admin-label">{t.role}</label>
                      <select value={newRole} onChange={(e) => setNewRole(e.target.value as UserRole)} className="admin-input">
                        <option value="ADMIN">Admin</option><option value="MODERATOR">Moderator</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                       <button type="submit" className="ama-gradient flex-1 py-4 rounded-xl text-black font-black uppercase text-[10px] tracking-widest">{t.add}</button>
                       <button type="button" onClick={() => setShowAddUser(false)} className="bg-white/5 flex-1 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">إلغاء</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right">
                  <thead className="border-b border-white/5">
                    <tr>
                      <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{t.username}</th>
                      <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{t.role}</th>
                      <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{t.status}</th>
                      <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="py-6 px-4 font-bold">{u.username}</td>
                        <td className="py-6 px-4"><span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-cyan-400 border border-cyan-500/20">{u.role}</span></td>
                        <td className="py-6 px-4">
                          <button onClick={() => setUsers(prev => prev.map(usr => usr.id === u.id ? { ...usr, isActive: !usr.isActive } : usr))} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${u.isActive ? 'text-green-400 border-green-500/20 bg-green-500/5' : 'text-red-400 border-red-500/20 bg-red-500/5'}`}>
                            {u.isActive ? t.active : t.inactive}
                          </button>
                        </td>
                        <td className="py-6 px-4">
                          <button 
                            disabled={u.role === 'OWNER'}
                            onClick={() => setConfirmDelete({ id: u.id, type: 'user' })} 
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${u.role === 'OWNER' ? 'opacity-20 cursor-not-allowed' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      <style>{`
        .admin-label { display: block; font-size: 10px; font-weight: 900; color: #6b7280; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.5rem; }
        .admin-label-xs { font-weight: 900; color: #4b5563; text-transform: uppercase; letter-spacing: 0.1em; }
        .admin-input { width: 100%; padding: 1rem 1.25rem; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; color: white; outline: none; transition: border 0.2s; font-size: 14px; }
        .admin-input:focus { border-color: #00e5ff; }
      `}</style>
    </div>
  );
};

export default AdminPanel;
