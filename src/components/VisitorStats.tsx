import React, { useState, useEffect } from 'react';
import { Users, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const VisitorStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeVisitors] = useState(Math.floor(Math.random() * 25) + 5); // 5-30 arası
  const [todayVisitors] = useState(Math.floor(Math.random() * 500) + 150); // 150-650 arası
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    // 3-5 saniye gecikme ile göster
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, Math.random() * 2000 + 3000); // 3000-5000ms arası

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 z-50 transition-all duration-500 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    } ${isRTL ? 'right-6' : 'left-6'}`}>
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-soft min-w-[200px]">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {activeVisitors}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{t('active_visitors')}</p>
            </div>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-secondary/20 rounded-full">
                <Eye size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {todayVisitors}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{t('today_visitors')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorStats;