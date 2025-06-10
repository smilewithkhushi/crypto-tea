import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Cloud, Flower, Heart, Star, Sparkles, Crown, Gift } from 'lucide-react';

// Types
interface SparkleData {
  id: number;
  x: number;
  y: number;
  delay: number;
}

// Mock wallet hook for demo
const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  
  const connect = () => {
    setIsConnected(true);
    setAddress('0x1234...5678');
  };
  
  const disconnect = () => {
    setIsConnected(false);
    setAddress('');
  };
  
  return { isConnected, address, connect, disconnect };
};

// Floating decoration component
const FloatingDecoration = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 1 }}
  >
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// Sparkle animation component
const SparkleEffect = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` } as React.CSSProperties}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
    }}
  >
    <Star className="w-3 h-3 text-yellow-300" />
  </motion.div>
);

// Main Header Component
export default function Header() {
  const { isConnected, address, connect, disconnect } = useWallet();
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  // Generate random sparkles
  useEffect(() => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setSparkles(newSparkles);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const teaCupVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      y: 0
    }
  };

  const floatingElementsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.header 
      className="relative py-12 overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />
      
      {/* Sparkle Effects */}
      {sparkles.map(sparkle => (
        <SparkleEffect
          key={sparkle.id}
          x={sparkle.x}
          y={sparkle.y}
          delay={sparkle.delay}
        />
      ))}
      
      {/* Floating Decorations */}
      <motion.div
        className="absolute inset-0"
        variants={floatingElementsVariants}
      >
        {/* Clouds */}
        <FloatingDecoration className="top-[10%] left-[5%]" delay={0}>
          <Cloud className="w-16 h-16 text-white/40" />
        </FloatingDecoration>
        
        <FloatingDecoration className="top-[20%] right-[8%]" delay={0.5}>
          <Cloud className="w-12 h-12 text-blue-200/60" />
        </FloatingDecoration>
        
        <FloatingDecoration className="bottom-[30%] left-[3%]" delay={1}>
          <Cloud className="w-20 h-20 text-purple-200/40" />
        </FloatingDecoration>
        
        {/* Flowers */}
        <FloatingDecoration className="top-[15%] left-[15%]" delay={0.3}>
          <Flower className="w-8 h-8 text-pink-300" />
        </FloatingDecoration>
        
        <FloatingDecoration className="top-[35%] right-[12%]" delay={0.8}>
          <Flower className="w-10 h-10 text-purple-300" />
        </FloatingDecoration>
        
        <FloatingDecoration className="bottom-[20%] right-[5%]" delay={1.3}>
          <Flower className="w-6 h-6 text-pink-400" />
        </FloatingDecoration>
        
        {/* Hearts */}
        <FloatingDecoration className="top-[25%] left-[25%]" delay={0.6}>
          <Heart className="w-6 h-6 text-red-300 fill-current" />
        </FloatingDecoration>
        
        <FloatingDecoration className="bottom-[40%] right-[15%]" delay={1.1}>
          <Heart className="w-8 h-8 text-pink-300 fill-current" />
        </FloatingDecoration>
        
        {/* Gifts */}
        <FloatingDecoration className="top-[45%] left-[8%]" delay={0.9}>
          <Gift className="w-7 h-7 text-yellow-300" />
        </FloatingDecoration>
        
        <FloatingDecoration className="bottom-[15%] left-[20%]" delay={1.6}>
          <Crown className="w-9 h-9 text-yellow-400" />
        </FloatingDecoration>
      </motion.div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
        {/* Title Section */}
        <motion.div
          className="mb-8"
          variants={titleVariants}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              variants={teaCupVariants}
              whileHover="hover"
              className="cursor-pointer"
            >
              <div className="relative">
                <Coffee className="w-16 h-16 text-amber-600" />
                {/* Steam effect */}
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-white/60 text-xs">☁️</div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-7xl font-bold gradient-text text-shadow-strong"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Crypto TEA
            </motion.h1>
            
            <motion.div
              className="text-5xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ☁️☕️
            </motion.div>
          </div>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 font-medium text-shadow mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Buy me a tea onchain! ✨
          </motion.p>
          
          <motion.p 
            className="text-lg text-white/80 font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Send some love with ETH or USDT 💜
          </motion.p>
        </motion.div>
        
        {/* Wallet Connection Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {!isConnected ? (
            <motion.button
              onClick={connect}
              className="glass-card-strong px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Connect Wallet
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
              </div>
            </motion.button>
          ) : (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-card px-6 py-3 flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                <span className="text-white/90 font-medium text-sm">Connected:</span>
                <span className="font-mono text-white font-semibold">{address}</span>
              </div>
              
              <motion.button
                onClick={disconnect}
                className="glass-card px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Disconnect
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        
      </div>
      
      {/* Bottom Wave Decoration */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 md:h-32"
        >
          <motion.path
            d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
            fill="rgba(255,255,255,0.1)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.path
            d="M0,80 C300,120 600,40 900,80 C1050,100 1150,60 1200,80 L1200,120 L0,120 Z"
            fill="rgba(255,255,255,0.05)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.7 }}
          />
        </svg>
      </motion.div>
    </motion.header>
  );
}