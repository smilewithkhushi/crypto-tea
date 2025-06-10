import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  hover?: boolean;
  animate?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  animate = true,
  padding = 'md'
}) => {
  const variants = {
    default: 'glass-card',
    strong: 'glass-card-strong',
    subtle: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl'
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  } : {};

  const hoverProps = hover ? {
    whileHover: { 
      scale: 1.02, 
      y: -5,
      transition: { duration: 0.2 }
    }
  } : {};

  return (
    <Component
      className={`${variants[variant]} ${paddings[padding]} ${className}`}
      {...animationProps}
      {...hoverProps}
    >
      {children}
    </Component>
  );
};