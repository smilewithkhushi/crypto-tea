'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';

// Components
import { WalletConnect } from '@/components/WalletConnect';
import { TeaForm } from '@/components/TeaForm';
import { TeaFeed } from '../components/TeaFeed';
import { SuccessModal } from '../components/SuccessModal';
import { ToastContainer, useToast } from '../components/ui/Toast';
import { Card } from '@/components/ui/CardComponent';

// Header component (from our previous design)
import { Coffee, Cloud, Flower, Heart, Star, Sparkles, Crown, Gift } from 'lucide-react';
import Header from '@/components/HeaderComponent';

// Get contract addresses from environment
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CRYPTO_TEA_CONTRACT || '';
const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_CONTRACT || '';


// Types
interface SparkleData {
  id: number;
  x: number;
  y: number;
  delay: number;
}

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

// Main Page Component
export default function CryptoTeaPage() {

  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  // Generate random sparkles
  useEffect(() => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 200,
      y: Math.random() * 200,
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

  const { isConnected } = useAccount();
  const { toasts, removeToast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if contract addresses are configured
  if (!CONTRACT_ADDRESS || !USDT_ADDRESS) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">
            Configuration Missing
          </h2>
          <p className="text-white/70 text-sm">
            Please set NEXT_PUBLIC_CRYPTO_TEA_CONTRACT and NEXT_PUBLIC_USDT_CONTRACT
            environment variables.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />

      <Header />

      {/* Sparkle Effects after header by kp*/}
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
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tea Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TeaForm
              contractAddress={CONTRACT_ADDRESS}
              usdtAddress={USDT_ADDRESS}
            />
          </motion.div>

          {/* Tea Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TeaFeed contractAddress={CONTRACT_ADDRESS} />
          </motion.div>
        </div>
      </main>

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

      {/* Footer */}
      <footer className="text-center py-8 text-white/60 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm mb-2">
            Made with 💜 by @smilewithkhushi
          </p>
          <p className="text-xs text-white/40">
            Built on Base ⚡          </p>
        </motion.div>
      </footer>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        position="top-right"
      />
    </div>
  );
}