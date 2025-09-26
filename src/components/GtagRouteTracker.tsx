import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-0VCQFCN57T";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GtagRouteTracker() {
  const location = useLocation();
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const gtag = window.gtag;
    if (typeof gtag !== "function") return;

    const pagePath = `${location.pathname}${location.search}${location.hash}`;

    if (isFirstRenderRef.current) {
      // Avoid double-counting the initial load (already captured by index.html config)
      isFirstRenderRef.current = false;
      return;
    }

    gtag("event", "page_view", {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [location]);

  return null;
}

