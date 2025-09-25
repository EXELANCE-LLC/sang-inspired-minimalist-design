import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ActiveVisitorsBar = () => {
  const { t, isRTL } = useLanguage();
  const [activeVisitors, setActiveVisitors] = useState<number>(() => {
    return Math.floor(Math.random() * 25) + 5;
  });

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

  const liveDot = useMemo(() => (
    <div className="relative inline-flex items-center justify-center w-3.5 h-3.5">
      <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-40 animate-ping"></span>
      <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
    </div>
  ), []);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-16 z-[49]">
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

