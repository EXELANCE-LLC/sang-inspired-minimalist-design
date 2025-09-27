import { Home, Briefcase, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, label: "home" },
    { path: "/work", icon: Briefcase, label: "work" },
    { path: "/blog", icon: BookOpen, label: "logs" },
  ];

  return (
    <nav id="site-navigation" className="fixed top-8 left-1/2 -translate-x-1/2 z-50 relative">
      <div className="bg-nav-background/80 backdrop-blur-sm rounded-full px-2 py-2 shadow-nav border border-border">
        <div className="flex items-center space-x-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <div className="flex items-center space-x-2">
                  <Icon size={16} />
                  <span>{t(label)}</span>
                </div>
              </Link>
            );
          })}
          
          <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-border">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;