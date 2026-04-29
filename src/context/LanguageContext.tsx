import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type SiteLanguage = 'EN' | 'FR';

type LanguageContextValue = {
  lang: SiteLanguage;
  setLang: (lang: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'enako_site_lang';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<SiteLanguage>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'FR' ? 'FR' : 'EN';
  });

  const setLang = (nextLang: SiteLanguage) => {
    setLangState(nextLang);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'FR' ? 'fr' : 'en';
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
};
