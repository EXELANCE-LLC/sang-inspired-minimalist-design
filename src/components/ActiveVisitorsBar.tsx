import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ActiveVisitorsBar = () => {
  const { t, isRTL } = useLanguage();
  const [activeVisitors, setActiveVisitors] = useState<number>(() => {
    return Math.floor(Math.random() * 25) + 5;
  });
  const [topOffset, setTopOffset] = useState<number>(64);

  // Optional slight variance to feel alive (doesn't jump on route change since mounted globally)
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveVisitors((prev) => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        const next = prev + delta;
        return Math.min(30, Math.max(5, next));
      });
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  // Position the bar directly under the navigation
  useEffect(() => {
    const computeTop = () => {
      const nav = document.getElementById("site-navigation");
      if (nav) {
        const rect = nav.getBoundingClientRect();
        // Place it right under the navbar with a tiny gap
        const gap = 4; // px
        setTopOffset(Math.max(0, rect.bottom + gap));
      } else {
        // Fallback sensible value
        setTopOffset(72);
      }
    };

    computeTop();
    window.addEventListener("resize", computeTop);
    window.addEventListener("orientationchange", computeTop);
    return () => {
      window.removeEventListener("resize", computeTop);
      window.removeEventListener("orientationchange", computeTop);
    };
  }, []);

  const liveDot = useMemo(() => (
    <div className="relative inline-flex items-center justify-center w-3.5 h-3.5">
      <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-40 animate-ping"></span>
      <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
    </div>
  ), []);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-[49]" style={{ top: topOffset }}>
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/95 border border-border shadow-soft ${isRTL ? 'flex-row-reverse' : ''}`}>
        {liveDot}
        <Users size={14} className="text-muted-foreground" />
        <span className="text-sm font-medium text-foreground tabular-nums">{activeVisitors}</span>
        <span className="text-xs text-muted-foreground">{t('active_visitors')}</span>
      </div>
    </div>
  );
};

export default ActiveVisitorsBar;

