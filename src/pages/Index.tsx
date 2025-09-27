import { useEffect, useState } from "react";
 
import HomePageComponent from "@/components/HomePageComponent";
import SparklingText from "@/components/SparklingText";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
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
  
  return (
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
          © 2024 — Made with <SparklingText>sparkle</SparklingText>
        </p>
      </footer>
    </div>
  );
};

export default Index;
