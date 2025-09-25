import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
 
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  
  const title = language === 'tr' ? '404 - Sayfa Bulunamadı' : '404 - Page Not Found';
  const description = language === 'tr' ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for could not be found.';
  const homeText = language === 'tr' ? 'Ana Sayfaya Dön' : 'Return Home';
  const backText = language === 'tr' ? 'Geri Dön' : 'Go Back';
  const searchText = language === 'tr' ? 'Blog\'da Ara' : 'Search Blog';
  
  const suggestions = language === 'tr' ? [
    { text: 'Ana Sayfa', link: '/' },
    { text: 'Blog', link: '/blog' },
    { text: 'Projeler', link: '/work' }
  ] : [
    { text: 'Home', link: '/' },
    { text: 'Blog', link: '/blog' },
    { text: 'Projects', link: '/work' }
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-soft">
        
        
        <div className="flex items-center justify-center min-h-[80vh] px-8">
          <div className="text-center space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-8xl font-light text-foreground animate-pulse">404</h1>
              <h2 className="text-2xl font-medium text-foreground">
                {language === 'tr' ? 'Sayfa Bulunamadı' : 'Page Not Found'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === 'tr' 
                  ? 'Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.' 
                  : 'The page you are looking for might have been moved, deleted, or never existed.'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="min-w-[160px]">
                  <Home className="mr-2 h-4 w-4" />
                  {homeText}
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => window.history.back()}
                className="min-w-[160px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backText}
              </Button>
              
              <Link to="/blog">
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  <Search className="mr-2 h-4 w-4" />
                  {searchText}
                </Button>
              </Link>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'tr' ? 'Belki bunları arıyordunuz:' : 'Maybe you were looking for:'}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((suggestion, index) => (
                  <Link key={index} to={suggestion.link}>
                    <Button variant="ghost" size="sm">
                      {suggestion.text}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;