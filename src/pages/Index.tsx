import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";
import heroCharacter from "@/assets/hero-character.png";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <VisitorStats />
      
      <main className="flex flex-col items-center justify-center min-h-screen px-8 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extralight text-foreground mb-6 tracking-wide">
            {t("Hi there!")}
          </h1>
        </div>
        
        <div className="hover-float">
          <img 
            src={heroCharacter}
            alt="Cute character with laptop"
            className="w-80 h-auto max-w-full shadow-soft rounded-3xl"
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground font-light">
            {t("I'm a designer and developer who loves creating beautiful, functional experiences.")}
          </p>
        </div>
      </main>
      
      <footer className="text-center pb-8">
        <p className="text-sm text-muted-foreground">
          © 2024 — Made with love
        </p>
      </footer>
    </div>
  );
};

export default Index;
