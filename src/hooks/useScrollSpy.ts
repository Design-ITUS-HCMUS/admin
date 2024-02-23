'use client';
import { useEffect, useState, useRef } from 'react';

/**
 * Hook to handle scroll spy
 * @param options
 * @param defaultActive The default active section ID
 * @return The active section ID
 * @example
 * // To start watching any element, add an id and data-section attribute to it
 * <Typography variant='h6' fontWeight='bold' id='basicInfo' {...{'data-section':''}} >
 *  Thông tin cơ bản
 * </Typography>
 */
export function useScrollSpy(
  { root, rootMargin = '-96px 0% -20% 0%', threshold }: IntersectionObserverInit,
  defaultActive = ''
): string {
  const [activeSection, setActiveSection] = useState(defaultActive);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create new instance and pass a callback function
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;

        // Update state with the visible section ID
        if (visibleSection) setActiveSection(visibleSection.id);
      },
      { root, rootMargin, threshold }
    );

    // Get custom attribute data-section from all sections
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    // Cleanup function to remove observer
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return activeSection;
}
