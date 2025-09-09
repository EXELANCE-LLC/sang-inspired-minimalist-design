import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  tr: {
    home: "ana sayfa",
    work: "çalışmalar", 
    logs: "günlükler",
    "Hi there!": "Merhaba!",
    "I'm a designer and developer who loves creating beautiful, functional experiences.": "Güzel ve işlevsel deneyimler yaratmayı seven bir tasarımcı ve geliştiriciyim.",
    "Work": "Çalışmalar",
    "Logs": "Günlükler",
    "Starting a new journey": "Yeni bir yolculuğun başlangıcı",
    "Today marks the beginning of something beautiful. Excited to share my thoughts and experiences here.": "Bugün güzel bir şeyin başlangıcını işaret ediyor. Düşüncelerimi ve deneyimlerimi burada paylaşmak için heyecanlıyım.",
    "Design inspiration": "Tasarım ilhamı",
    "Found some amazing minimalist design patterns that really speak to me. Sometimes less truly is more.": "Bana gerçekten hitap eden harika minimalist tasarım kalıpları buldum. Bazen daha az gerçekten daha fazladır.",
    "Hello world": "Merhaba dünya",
    "First entry in this space. Looking forward to documenting the creative process and sharing insights.": "Bu alandaki ilk girişim. Yaratıcı süreci belgelemeyi ve içgörüleri paylaşmayı dört gözle bekliyorum.",
    "Project One": "Proje Bir",
    "Project Two": "Proje İki", 
    "Project Three": "Proje Üç",
    "A beautiful project description goes here.": "Güzel bir proje açıklaması buraya gelir.",
    "Another amazing project with great results.": "Harika sonuçları olan bir başka muhteşem proje.",
    "Creative solutions for modern problems.": "Modern problemler için yaratıcı çözümler.",
    "active_visitors": "aktif ziyaretçi",
    "today_visitors": "bugünkü toplam ziyaretçi"
  },
  en: {
    home: "home",
    work: "work",
    logs: "logs", 
    "Hi there!": "Hi there!",
    "I'm a designer and developer who loves creating beautiful, functional experiences.": "I'm a designer and developer who loves creating beautiful, functional experiences.",
    "Work": "Work",
    "Logs": "Logs",
    "Starting a new journey": "Starting a new journey",
    "Today marks the beginning of something beautiful. Excited to share my thoughts and experiences here.": "Today marks the beginning of something beautiful. Excited to share my thoughts and experiences here.",
    "Design inspiration": "Design inspiration",
    "Found some amazing minimalist design patterns that really speak to me. Sometimes less truly is more.": "Found some amazing minimalist design patterns that really speak to me. Sometimes less truly is more.",
    "Hello world": "Hello world",
    "First entry in this space. Looking forward to documenting the creative process and sharing insights.": "First entry in this space. Looking forward to documenting the creative process and sharing insights.",
    "Project One": "Project One",
    "Project Two": "Project Two",
    "Project Three": "Project Three", 
    "A beautiful project description goes here.": "A beautiful project description goes here.",
    "Another amazing project with great results.": "Another amazing project with great results.",
    "Creative solutions for modern problems.": "Creative solutions for modern problems.",
    "active_visitors": "active visitors",
    "today_visitors": "total visitors today"
  },
  ar: {
    home: "الرئيسية",
    work: "الأعمال",
    logs: "المدونة",
    "Hi there!": "مرحباً!",
    "I'm a designer and developer who loves creating beautiful, functional experiences.": "أنا مصمم ومطور أحب إنشاء تجارب جميلة وعملية.",
    "Work": "الأعمال", 
    "Logs": "المدونة",
    "Starting a new journey": "بداية رحلة جديدة",
    "Today marks the beginning of something beautiful. Excited to share my thoughts and experiences here.": "اليوم يمثل بداية شيء جميل. متحمس لمشاركة أفكاري وتجاربي هنا.",
    "Design inspiration": "إلهام التصميم",
    "Found some amazing minimalist design patterns that really speak to me. Sometimes less truly is more.": "وجدت بعض أنماط التصميم البسيط المذهلة التي تتحدث إلي حقاً. أحياناً الأقل هو الأكثر حقاً.",
    "Hello world": "مرحباً بالعالم",
    "First entry in this space. Looking forward to documenting the creative process and sharing insights.": "أول إدخال في هذا المساحة. أتطلع إلى توثيق العملية الإبداعية ومشاركة الرؤى.",
    "Project One": "المشروع الأول",
    "Project Two": "المشروع الثاني",
    "Project Three": "المشروع الثالث",
    "A beautiful project description goes here.": "وصف مشروع جميل يأتي هنا.",
    "Another amazing project with great results.": "مشروع رائع آخر بنتائج عظيمة.",
    "Creative solutions for modern problems.": "حلول إبداعية للمشاكل الحديثة.",
    "active_visitors": "زائر نشط",
    "today_visitors": "إجمالي الزوار اليوم"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const detectLanguage = (): string => {
  // Get browser language
  const browserLang = navigator.language.split('-')[0];
  
  // Get user location (simplified - in real app you'd use geolocation API)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isTurkiye = timezone.includes('Istanbul') || timezone.includes('Europe/Istanbul');
  
  // Language detection logic
  if (browserLang === 'tr') return 'tr';
  if (browserLang === 'ar') return 'ar';
  if (browserLang === 'en') return 'en';
  
  // Default logic based on location
  if (isTurkiye) return 'tr';
  
  // Default to English for other locations
  return 'en';
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>('tr');

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
  }, []);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.tr] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};