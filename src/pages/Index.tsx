import { useEffect, useState } from "react";
 
import HomePageComponent from "@/components/HomePageComponent";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showElements, setShowElements] = useState({
    title: false,
    subtitle: false,
    description: false,
    footer: false
  });

  useEffect(() => {
    // Trigger initial load
    setTimeout(() => setIsLoaded(true), 100);

    // Staggered animation sequence
    const timeouts = [
      setTimeout(() => setShowElements(prev => ({ ...prev, title: true })), 200),
      setTimeout(() => setShowElements(prev => ({ ...prev, subtitle: true })), 500),
      setTimeout(() => setShowElements(prev => ({ ...prev, description: true })), 1400),
      setTimeout(() => setShowElements(prev => ({ ...prev, footer: true })), 1700),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Multi-language page metadata
  const pageTitles = {
    en: "WebustaLLC - Design & Development",
    tr: "WebustaLLC - Tasarım & Geliştirme",
    ar: "WebustaLLC - التصميم والتطوير"
  };

  const pageDescriptions = {
    en: "Professional web design and development services. Creating beautiful, functional digital experiences with modern technologies.",
    tr: "Profesyonel web tasarım ve geliştirme hizmetleri. Modern teknolojilerle güzel ve işlevsel dijital deneyimler yaratıyoruz.",
    ar: "خدمات تصميم وتطوير الويب الاحترافية. إنشاء تجارب رقمية جميلة وعملية بتقنيات حديثة."
  };

  const pageTitle = pageTitles[language as keyof typeof pageTitles] || pageTitles.en;
  const pageDescription = pageDescriptions[language as keyof typeof pageDescriptions] || pageDescriptions.en;
  
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <div className="min-h-screen bg-gradient-soft overflow-hidden">
        {/* Navigation and ActiveVisitorsBar are now mounted globally in App */}
        
        <main className="flex flex-col items-center justify-center min-h-screen px-8 pt-16 relative">

        {/* Subtitle removed per request */}
        
        {/* Sang.design Exact Implementation */}
        <HomePageComponent />

        {/* Decorative dots and description removed per request */}

        </main>
        
        {/* Animated Footer */}
        <footer className={`text-center pb-8 transition-all duration-1000 ease-out ${
          showElements.footer 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4'
        }`}>
          <p className="text-sm text-muted-foreground">
            © 2024 — Made with love
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;
