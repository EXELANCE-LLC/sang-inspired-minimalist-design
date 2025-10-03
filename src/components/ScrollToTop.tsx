import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component - Her route değişiminde sayfayı en üste kaydırır
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Her route değişiminde scroll pozisyonunu en üste al
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

