import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, AlertCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  icon?: React.ReactNode;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  showCount = false,
  icon,
  maxLength,
  value,
  className = '',
  ...props
}) => {
  const { 
    onDrag, 
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onAnimationStart, 
    onAnimationEnd, 
    onAnimationIteration,
    ...textareaProps 
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const currentLength = String(value || '').length;

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {icon || <MessageCircle className="w-4 h-4 text-purple-300" />}
          <label className="text-sm font-semibold text-white/90 text-shadow">
            {label}
          </label>
        </motion.div>
      )}
      
      {/* Textarea Container */}
      <motion.div 
        className="relative"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <motion.textarea
          className={`input-cute w-full resize-none ${
            error ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''
          } ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          value={value}
          {...textareaProps}
        />
        
        
        {/* Focus Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ 
            opacity: isFocused ? 0.3 : 0, 
            scale: isFocused ? 1 : 0.98 
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Floating placeholder animation */}
        {isFocused && !value && (
          <motion.div
            className="absolute top-3 left-4 text-purple-300/60 text-sm pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            Share your thoughts... ✨
          </motion.div>
        )}
      </motion.div>
      
      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        {/* Helper Text or Error */}
        <div className="flex items-center gap-1">
          {error && (
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
            </motion.div>
          )}
          {!error && helperText && (
            <p className="text-sm text-white/60">{helperText}</p>
          )}
        </div>
        
        {/* Character Count */}
        {showCount && maxLength && (
          <motion.div
            className={`text-xs font-medium ${
              currentLength > maxLength * 0.9 
                ? 'text-orange-300' 
                : currentLength > maxLength * 0.8 
                ? 'text-yellow-300' 
                : 'text-white/50'
            }`}
            animate={{
              scale: currentLength > maxLength * 0.9 ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 0.2 }}
          >
            {currentLength}/{maxLength}
          </motion.div>
        )}
      </div>
    </div>
  );
};