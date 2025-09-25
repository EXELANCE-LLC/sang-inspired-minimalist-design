import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  tr: {
    home: "Ev",
    work: "İş", 
    logs: "Blog",
    "Hi there!": "Merhaba!",
    "I'm a designer and developer who loves creating beautiful, functional experiences.": "Güzel ve işlevsel deneyimler yaratmayı seven bir tasarımcı ve geliştiriciyim.",
    "Work": "İş",
    "Logs": "Blog",
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
    "today_visitors": "bugünkü toplam ziyaretçi",
    "view_details": "detayları gör",
    "close": "kapat",
    "technologies": "teknolojiler",
    "duration": "süre",
    "role": "rol",
    "client": "müşteri",
    "website": "web sitesi",
    "mobile_app": "mobil uygulama",
    "smart_watch_app": "akıllı saat uygulaması",
    "ecommerce_platform": "e-ticaret platformu",
    "saas_dashboard": "SaaS kontrol paneli",
    "bug_bounty_hunter": "bug bounty avcısı",
    "red_team_specialist": "kırmızı takım uzmanı",
    "penetration_testing": "sızma testi",
    "security_audit": "güvenlik denetimi",
    "web_redesign": "web yeniden tasarımı",
    "api_development": "API geliştirme",
    "blockchain_solution": "blok zinciri çözümü",
    "ai_ml_integration": "AI/ML entegrasyonu",
    "iot_platform": "IoT platformu",
    "gaming_app": "oyun uygulaması",
    "fintech_app": "fintech uygulaması",
    "healthcare_app": "sağlık uygulaması",
    "education_platform": "eğitim platformu",
    "social_media_app": "sosyal medya uygulaması",
    "productivity_tool": "üretkenlik aracı",
    "data_visualization": "veri görselleştirme",
    "real_estate_platform": "emlak platformu",
    "travel_booking": "seyahat rezervasyonu",
    "food_delivery": "yiyecek teslimatı",
    "fitness_tracker": "fitness takipçisi",
    "music_streaming": "müzik akışı",
    "video_conferencing": "video konferans",
    "project_management": "proje yönetimi",
    "crm_system": "CRM sistemi",
    "inventory_management": "envanter yönetimi",
    "payment_gateway": "ödeme geçidi",
    "chatbot_solution": "sohbet robotu çözümü",
    "vr_ar_experience": "VR/AR deneyimi"
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
    "today_visitors": "total visitors today",
    "view_details": "view details",
    "close": "close",
    "technologies": "technologies",
    "duration": "duration",
    "role": "role",
    "client": "client",
    "website": "website",
    "mobile_app": "mobile app",
    "smart_watch_app": "smart watch app",
    "ecommerce_platform": "e-commerce platform",
    "saas_dashboard": "SaaS dashboard",
    "bug_bounty_hunter": "bug bounty hunter",
    "red_team_specialist": "red team specialist",
    "penetration_testing": "penetration testing",
    "security_audit": "security audit",
    "web_redesign": "web redesign",
    "api_development": "API development",
    "blockchain_solution": "blockchain solution",
    "ai_ml_integration": "AI/ML integration",
    "iot_platform": "IoT platform",
    "gaming_app": "gaming app",
    "fintech_app": "fintech app",
    "healthcare_app": "healthcare app",
    "education_platform": "education platform",
    "social_media_app": "social media app",
    "productivity_tool": "productivity tool",
    "data_visualization": "data visualization",
    "real_estate_platform": "real estate platform",
    "travel_booking": "travel booking",
    "food_delivery": "food delivery",
    "fitness_tracker": "fitness tracker",
    "music_streaming": "music streaming",
    "video_conferencing": "video conferencing",
    "project_management": "project management",
    "crm_system": "CRM system",
    "inventory_management": "inventory management",
    "payment_gateway": "payment gateway",
    "chatbot_solution": "chatbot solution",
    "vr_ar_experience": "VR/AR experience"
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
    "today_visitors": "إجمالي الزوار اليوم",
    "view_details": "عرض التفاصيل",
    "close": "إغلاق",
    "technologies": "التقنيات",
    "duration": "المدة الزمنية",
    "role": "الدور",
    "client": "العميل",
    "website": "الموقع الإلكتروني",
    "mobile_app": "تطبيق الهاتف المحمول",
    "smart_watch_app": "تطبيق الساعة الذكية",
    "ecommerce_platform": "منصة التجارة الإلكترونية",
    "saas_dashboard": "لوحة تحكم SaaS",
    "bug_bounty_hunter": "صياد مكافآت الأخطاء",
    "red_team_specialist": "متخصص الفريق الأحمر",
    "penetration_testing": "اختبار الاختراق",
    "security_audit": "تدقيق الأمان",
    "web_redesign": "إعادة تصميم الموقع",
    "api_development": "تطوير API",
    "blockchain_solution": "حل البلوكشين",
    "ai_ml_integration": "تكامل AI/ML",
    "iot_platform": "منصة IoT",
    "gaming_app": "تطبيق الألعاب",
    "fintech_app": "تطبيق التكنولوجيا المالية",
    "healthcare_app": "تطبيق الرعاية الصحية",
    "education_platform": "منصة التعليم",
    "social_media_app": "تطبيق وسائل التواصل الاجتماعي",
    "productivity_tool": "أداة الإنتاجية",
    "data_visualization": "تصور البيانات",
    "real_estate_platform": "منصة العقارات",
    "travel_booking": "حجز السفر",
    "food_delivery": "توصيل الطعام",
    "fitness_tracker": "متتبع اللياقة البدنية",
    "music_streaming": "بث الموسيقى",
    "video_conferencing": "مؤتمرات الفيديو",
    "project_management": "إدارة المشاريع",
    "crm_system": "نظام CRM",
    "inventory_management": "إدارة المخزون",
    "payment_gateway": "بوابة الدفع",
    "chatbot_solution": "حل الدردشة الآلية",
    "vr_ar_experience": "تجربة VR/AR"
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

const detectLanguage = async (): Promise<string> => {
  try {
    // Get browser language preferences
    const browserLangs = navigator.languages || [navigator.language];
    const primaryLang = browserLangs[0]?.split('-')[0];

    // Get timezone information
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Check for Turkey
    const isTurkiye = timezone.includes('Istanbul') || timezone.includes('Europe/Istanbul') ||
                     timezone.includes('Asia/Istanbul') || timezone.includes('Turkey');

    // Check for Arabic countries
    const isArabicCountry = timezone.includes('Asia/Riyadh') || timezone.includes('Asia/Dubai') ||
                           timezone.includes('Africa/Cairo') || timezone.includes('Asia/Baghdad') ||
                           timezone.includes('Asia/Amman') || timezone.includes('Asia/Beirut');

    // Try to get geolocation for more accurate detection
    let countryCode = '';
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      });

      // In a real app, you'd use a reverse geocoding service here
      // For now, we'll use timezone-based detection
    } catch (error) {
      // Geolocation failed, continue with other methods
    }

    // Language detection priority:
    // 1. Browser language preference
    // 2. Location-based detection
    // 3. Fallback to defaults

    // Direct language matches
    if (primaryLang === 'tr') return 'tr';
    if (primaryLang === 'ar') return 'ar';
    if (primaryLang === 'en') return 'en';

    // Check for Arabic language variants
    if (browserLangs.some(lang => lang.startsWith('ar'))) return 'ar';

    // Location-based defaults
    if (isTurkiye) return 'tr';
    if (isArabicCountry) return 'ar';

    // Check if user is in Turkey or Arabic countries based on language
    const turkicLanguages = ['tr', 'az', 'kk', 'uz', 'tk'];
    const arabicLanguages = ['ar', 'fa', 'ur'];

    if (turkicLanguages.includes(primaryLang)) return 'tr';
    if (arabicLanguages.includes(primaryLang)) return 'ar';

    // Default to English for other locations
    return 'en';

  } catch (error) {
    // Fallback to browser language only
    const browserLang = navigator.language.split('-')[0];

    if (browserLang === 'tr') return 'tr';
    if (browserLang === 'ar') return 'ar';

    // Default fallback
    return 'en';
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>('tr');

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Check URL for language preference
        const urlPath = window.location.pathname;
        const urlLangMatch = urlPath.match(/^\/(en|tr|ar)(\/|$)/);
        
        if (urlLangMatch) {
          setLanguage(urlLangMatch[1]);
        } else {
          // Check localStorage for saved preference
          const savedLang = localStorage.getItem('preferredLanguage');
          if (savedLang && ['tr', 'en', 'ar'].includes(savedLang)) {
            setLanguage(savedLang);
          } else {
            // Auto-detect language
            const detectedLang = await detectLanguage();
            setLanguage(detectedLang);
          }
        }
      } catch (error) {
        console.warn('Language detection failed, using default:', error);
        setLanguage('tr'); // Fallback to Turkish
      }
    };

    initializeLanguage();
  }, []);

  const t = (key: string): string => {
    // Bubble messages için özel çeviriler
    const bubbleTranslations = {
      tr: {
        "My name is Bigo": "Benim adım Bigo",
        "I'm a designer & developer based in Turkey": "Türkiye merkezli bir tasarımcı ve geliştiriciyim",
        "Crafting digital experiences with passion and precision": "Tutku ve hassasiyetle dijital deneyimler yaratıyoruz"
      },
      en: {
        "My name is Bigo": "My name is Bigo",
        "I'm a designer & developer based in Turkey": "I'm a designer & developer based in Turkey",
        "Crafting digital experiences with passion and precision": "Crafting digital experiences with passion and precision"
      },
      ar: {
        "My name is Bigo": "اسمي بيجو",
        "I'm a designer & developer based in Turkey": "أنا مصمم ومطور مقيم في تركيا",
        "Crafting digital experiences with passion and precision": "صناعة تجارب رقمية بشغف ودقة"
      }
    };

    // Önce bubble çevirilerini kontrol et
    if (bubbleTranslations[language as keyof typeof bubbleTranslations]?.[key as keyof typeof bubbleTranslations.tr]) {
      return bubbleTranslations[language as keyof typeof bubbleTranslations][key as keyof typeof bubbleTranslations.tr];
    }

    // Sonra normal çevirileri kontrol et
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.tr] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    // Save language preference
    localStorage.setItem('preferredLanguage', language);
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};