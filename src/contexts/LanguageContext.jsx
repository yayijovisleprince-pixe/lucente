import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../i18n/en";
import it from "../i18n/it";
import fr from "../i18n/fr";

const dictionaries = { fr, it, en };

const LanguageContext = createContext({
  lang: "fr",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const detectLang = () => {
    const saved = localStorage.getItem("lucente_lang");
    if (saved === "fr" || saved === "it" || saved === "en") return saved;
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    if (browserLang === "it") return "it";
    if (browserLang === "en") return "en";
    return "fr"; // Default to FR if French or other
  };

  const [lang, setLangState] = useState(detectLang);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("lucente_lang", newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => {
    const dict = dictionaries[lang] || dictionaries.fr;
    const keys = key.split(".");
    let value = dict;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    if (value === undefined) {
      const fallback = dictionaries.en || dictionaries.fr;
      let fb = fallback;
      for (const k of keys) {
        fb = fb?.[k];
        if (fb === undefined) break;
      }
      return fb ?? key;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
