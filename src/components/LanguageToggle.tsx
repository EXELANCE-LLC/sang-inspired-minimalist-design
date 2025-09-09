import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const languages = ['tr', 'en', 'ar'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'tr':
        return 'TR';
      case 'en':
        return 'EN';
      case 'ar':
        return 'ع';
      default:
        return 'TR';
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 p-2 rounded-full hover:bg-muted transition-colors duration-200"
      aria-label="Toggle language"
    >
      <Languages size={14} />
      <span className="text-xs font-medium min-w-[20px]">{getLanguageLabel()}</span>
    </button>
  );
};

export default LanguageToggle;