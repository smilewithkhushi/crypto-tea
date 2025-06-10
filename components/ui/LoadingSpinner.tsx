import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'teacup' | 'dots' | 'brewing';
  text?: string;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'teacup',
  text,
  color = 'text-purple-400'
}) => {
  const sizeClasses = {
    sm: { icon: 'w-4 h-4', text: 'text-sm', container: 'gap-2' },
    md: { icon: 'w-6 h-6', text: 'text-base', container: 'gap-3' },
    lg: { icon: 'w-8 h-8', text: 'text-lg', container: 'gap-4' }
  };

  const currentSize = sizeClasses[size];

  const renderSpinner = () => {
    switch (variant) {
      case 'spinner':
        return (
          <motion.div
            className={`${currentSize.icon} ${color} border-2 border-current border-t-transparent rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        );

      case 'teacup':
        return (
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Coffee className={`${currentSize.icon} text-amber-600`} />
            </motion.div>
            
            {/* Steam animation */}
            <motion.div
              className="absolute -top-1 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-white/60 text-xs">☁️</div>
            </motion.div>
          </div>
        );

      case 'dots':
        return (
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 ${color.replace('text-', 'bg-')} rounded-full`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );

      case 'brewing':
        return (
          <div className="relative">
            {/* Tea cup */}
            <motion.div
              className={`${currentSize.icon} text-amber-600`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ☕
            </motion.div>
            
            {/* Sparkles around cup */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-xs"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-12px)`
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        );

      default:
        return (
          <Loader2 
            className={`${currentSize.icon} ${color} animate-spin`} 
          />
        );
    }
  };

  return (
    <motion.div 
      className={`flex items-center justify-center ${currentSize.container}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {renderSpinner()}
      
      {text && (
        <motion.span 
          className={`${currentSize.text} ${color} font-medium`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
};