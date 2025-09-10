import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import HomePageComponent from "@/components/HomePageComponent";
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
      <Navigation />
      <VisitorStats />
      
      <main className="flex flex-col items-center justify-center min-h-screen px-8 pt-16 relative">
        {/* Animated Title */}
        <div className={`text-center mb-8 transition-all duration-1000 ease-out ${
          showElements.title 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground mb-6 tracking-wide">
            <span className="inline-block" style={{ 
              animation: showElements.title ? 'fadeInUp 1s ease-out 0.2s both' : 'none' 
            }}>
              {t("Hi there!")}
            </span>
          </h1>
          
          {/* Decorative elements */}
          <div className={`flex justify-center space-x-4 mt-4 transition-opacity duration-1000 ${
            showElements.title ? 'opacity-100' : 'opacity-0'
          }`} style={{ animationDelay: '0.8s' }}>
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-1 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Animated Subtitle */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out delay-300 ${
          showElements.subtitle 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            {t("I'm a designer and developer who loves creating beautiful, functional experiences.")}
          </p>
        </div>
        
        {/* Sang.design Exact Implementation */}
        <HomePageComponent />

        {/* Animated Description */}
        <div className={`text-center transition-all duration-1000 ease-out ${
          showElements.description 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex justify-center space-x-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="text-sm text-muted-foreground">
              Crafting digital experiences with passion and precision
            </p>
          </div>
        </div>

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
  );
};

export default Index;
