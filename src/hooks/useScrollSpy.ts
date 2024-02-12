import { useEffect, useState, useRef } from 'react';

export function useScrollSpy(defaultActive = ''): string {
  const [activeSection, setActiveSection] = useState(defaultActive);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create new instance and pass a callback function
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.intersectionRatio > 0)?.map((entry) => entry.target);

        // Update state with the visible section ID
        if (visibleSections && visibleSections.length > 0) setActiveSection(visibleSections[0].id);
      },
      { rootMargin: '-64px 0px 0px' }
    );

    // Get custom attribute data-section from all sections
    const sections = document.querySelectorAll('[data-section]');

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
