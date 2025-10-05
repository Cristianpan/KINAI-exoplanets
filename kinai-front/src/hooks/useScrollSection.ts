"use client";
import { useState, useEffect } from 'react';

export const useScrollSection = () => {
  const [isInContentSection, setIsInContentSection] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Extra validation for SSR
      if (typeof window === 'undefined') return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Si el scroll es mayor a la altura de la ventana (header), está en secciones de contenido
      const isInContent = scrollY > windowHeight * 0.8; // 80% de la altura del header
      setIsInContentSection(isInContent);
    };

    // Verificar inicialmente
    handleScroll();

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return isInContentSection;
};
