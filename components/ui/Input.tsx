import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  rightElement,
  leftElement,
  helperText,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <motion.label 
          className="block text-sm font-semibold text-shadow"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}
      
      {/* Input Container */}
      <motion.div 
        className="relative"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Left Element */}
        {leftElement && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            {leftElement}
          </div>
        )}
        
        {/* Input Field */}
        <motion.input
          className={`input-cute w-full ${
            leftElement ? 'pl-10' : ''
          } ${
            rightElement ? 'pr-10' : ''
          } ${
            error ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''
          } ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...(({ onAnimationStart, onAnimationEnd, onAnimationIteration, ...rest }) => rest)(props)}
        />
        
        {/* Focus Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isFocused ? 0.3 : 0, 
            scale: isFocused ? 1 : 0.95 
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Right Element */}
        {rightElement && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
            {rightElement}
          </div>
        )}
      </motion.div>
      
      {/* Helper Text or Error */}
      {(error || helperText) && (
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error && <AlertCircle className="w-4 h-4 text-red-400" />}
          <p className={`text-sm ${
            error ? 'text-red-300' : 'text-white/60'
          }`}>
            {error || helperText}
          </p>
        </motion.div>
      )}
    </div>
  );
};