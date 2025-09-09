import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";

const Work = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <VisitorStats />
      
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-light text-foreground mb-8">
            {t("Work")}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for work items */}
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-float">
              <div className="w-16 h-16 bg-gradient-warm rounded-xl mb-6 mx-auto"></div>
              <h3 className="text-xl font-medium mb-4">{t("Project One")}</h3>
              <p className="text-muted-foreground">
                {t("A beautiful project description goes here.")}
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-float">
              <div className="w-16 h-16 bg-gradient-warm rounded-xl mb-6 mx-auto"></div>
              <h3 className="text-xl font-medium mb-4">{t("Project Two")}</h3>
              <p className="text-muted-foreground">
                {t("Another amazing project with great results.")}
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-float">
              <div className="w-16 h-16 bg-gradient-warm rounded-xl mb-6 mx-auto"></div>
              <h3 className="text-xl font-medium mb-4">{t("Project Three")}</h3>
              <p className="text-muted-foreground">
                {t("Creative solutions for modern problems.")}
              </p>
            </div>
          </div>
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

export default Work;