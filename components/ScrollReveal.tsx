import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  animation?: 'fade-in-up' | 'scale-in' | 'slide-down' | 'hero-pop';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  animation = 'fade-in-up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) {
      if (animation === 'scale-in') return "opacity-0 scale-90";
      if (animation === 'slide-down') return "opacity-0 -translate-y-10";
      if (animation === 'hero-pop') return "opacity-0 scale-90 blur-sm translate-y-4";
      return "opacity-0 translate-y-10"; // Default fade-in-up
    }
    return `animate-${animation}`;
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${getAnimationClass()}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};