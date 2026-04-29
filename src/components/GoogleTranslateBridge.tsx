import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (options: Record<string, unknown>, elementId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const SCRIPT_ID = 'google-translate-script';

const GoogleTranslateBridge = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const initializedRef = useRef(false);

  useEffect(() => {
    const initWidget = () => {
      if (initializedRef.current) return;
      const host = document.getElementById('google_translate_element');
      if (!host || !window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,fr',
          autoDisplay: false,
        },
        'google_translate_element'
      );
      initializedRef.current = true;
    };

    if (!document.getElementById(SCRIPT_ID)) {
      window.googleTranslateElementInit = initWidget;
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else {
      initWidget();
    }
  }, []);

  useEffect(() => {
    const applyLanguage = () => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (!combo) return;

      const target = lang === 'FR' ? 'fr' : 'en';
      if (combo.value !== target) {
        combo.value = target;
        combo.dispatchEvent(new Event('change'));
      }
    };

    const timer = window.setTimeout(applyLanguage, 250);
    return () => window.clearTimeout(timer);
  }, [lang, location.pathname]);

  return <div id="google_translate_element" className="sr-only" aria-hidden="true" />;
};

export default GoogleTranslateBridge;
