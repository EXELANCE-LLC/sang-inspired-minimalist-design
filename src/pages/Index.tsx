import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";
import heroCharacter from "@/assets/face-sprite-dark.png";
import laptopLid from "@/assets/laptop-lid.png";

const Index = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showElements, setShowElements] = useState({
    title: false,
    subtitle: false,
    laptop: false,
    character: false,
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
      setTimeout(() => setShowElements(prev => ({ ...prev, laptop: true })), 800),
      setTimeout(() => setShowElements(prev => ({ ...prev, character: true })), 1100),
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
        
        {/* Laptop and Character Container */}
        <div className="relative flex flex-col md:flex-row items-center justify-center mb-16 space-y-8 md:space-y-0">
          {/* Laptop Animation */}
          <div className={`relative transition-all duration-1200 ease-out ${
            showElements.laptop 
              ? 'opacity-100 transform translate-x-0 scale-100' 
              : 'opacity-0 transform translate-x-8 scale-95'
          }`}>
            <div className="laptop-container relative">
              <img 
                src={laptopLid}
                alt="Laptop"
                className="w-48 md:w-64 h-auto laptop-lid transform-gpu"
                style={{
                  transformOrigin: 'bottom center',
                  animation: showElements.laptop ? 'laptopOpen 1.5s ease-out 0.5s both' : 'none'
                }}
              />
              {/* Laptop Screen Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent rounded-lg transition-opacity duration-1000 ${
                showElements.laptop ? 'opacity-100' : 'opacity-0'
              }`} style={{ animationDelay: '1s' }} />
              
              {/* Typing Animation Effect */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
                showElements.laptop ? 'opacity-100' : 'opacity-0'
              }`} style={{ animationDelay: '1.5s' }}>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Character Animation */}
          <div className={`relative md:ml-8 transition-all duration-1200 ease-out ${
            showElements.character 
              ? 'opacity-100 transform translate-x-0 scale-100' 
              : 'opacity-0 transform translate-x-8 scale-95'
          }`}>
            <div className="character-container relative">
              <img 
                src={heroCharacter}
                alt="Character"
                className="w-40 md:w-48 h-auto shadow-soft rounded-3xl hover-float"
                style={{
                  animation: showElements.character ? 'characterBounce 2s ease-out 0.3s both' : 'none'
                }}
              />
              {/* Character Floating Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl opacity-50 animate-pulse" />
              
              {/* Interaction Indicators */}
              <div className={`absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full transition-opacity duration-1000 ${
                showElements.character ? 'opacity-100' : 'opacity-0'
              }`} style={{ animationDelay: '2s' }}>
                <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>

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

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-primary/30 rounded-full transition-all duration-1000 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
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
