import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavigationLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // List of regex patterns for routes requiring a loader
    const routesWithLoader = [
      /^\/$/, // Home
      /^\/signIn$/,
      /^\/my-account$/,
      /^\/cart$/,
      /^\/checkout$/,
      /^\/order-details\/[^/]+$/, // Matches /order-details/:orderId
      /^\/peerals$/,
      /^\/favourit-list$/,
      /^\/account$/,
      /^\/category\/[^/]+$/, // Matches /category/:categoryId
      /^\/about-us$/,
      /^\/contact$/,
      /^\/delivery$/,
      /^\/certifications$/,
      /^\/return-policy$/,
      /^\/secure-payment$/,
      /^\/partnership$/,
      /^\/terms-conditions$/,
      /^\/product-view-details\/[^/]+$/, // Matches /product-view-details/:productId
    ];

    // Check if the current route matches any of the patterns
    const matchesRoute = routesWithLoader.some((pattern) =>
      pattern.test(location.pathname)
    );

    if (matchesRoute) {
      setLoading(true);

      // Simulate a brief loading duration
      const timeoutId = setTimeout(() => setLoading(false), 300);

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
    }
  }, [location]);

  return loading;
};

export default useNavigationLoader;
