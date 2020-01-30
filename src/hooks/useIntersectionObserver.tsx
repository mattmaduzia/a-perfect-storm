import { useEffect, useState } from "react";

export interface IntersectionObserverHookProps {
  delayOnIntersect?: number;
  intersectEl: string;
}

/**
 * Hook to facilitate animation on scroll intersection
 * @param delayOnIntersect
 * @param intersectEl
 * @author Matt Maduzia
 */
export function useIntersectionObserver({ delayOnIntersect, intersectEl }: IntersectionObserverHookProps) {

  const [isAnimating, setIsAnimating] = useState(false);

  const animate = (
    observer: IntersectionObserver,
    entry: IntersectionObserverEntry,
  ) => {
    setIsAnimating(true);
    observer.unobserve(entry.target);
  };

  useEffect(() => {
      const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            if (delayOnIntersect) {
              setTimeout(
                () => animate(observer, entry),
                delayOnIntersect
              );
            } else {
              animate(observer, entry);
            }
          }
        });
      });

      observer.observe(document.getElementById(intersectEl)!);
      return () => observer.disconnect();
  }, []);

  return { isAnimating, setIsAnimating };
}
