import React from 'react';
import { motion } from 'framer-motion';
import { useReadContract } from 'wagmi';
import { Gift, Coffee } from 'lucide-react';
import { Card } from './ui/CardComponent';
import { LoadingSpinner } from './ui/LoadingSpinner';

const CRYPTO_TEA_ABI = [
  {
    inputs: [],
    name: "getAllTeas",
    outputs: [{
      components: [
        { name: "sender", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "currency", type: "string" },
        { name: "message", type: "string" },
        { name: "timestamp", type: "uint256" }
      ],
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  }
] as const;

interface Tea {
  sender: string;
  amount: bigint;
  currency: string;
  message: string;
  timestamp: bigint;
}

interface TeaMessageProps {
  tea: Tea;
  index: number;
}

const TeaMessage: React.FC<TeaMessageProps> = ({ tea, index }) => {
  const formatAmount = (amount: bigint, currency: string) => {
    if (currency === 'ETH') {
      return (Number(amount) / 1e18).toFixed(4);
    }
    return (Number(amount) / 1e6).toFixed(2);
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.div
      className="glass-card p-4 hover:bg-white/10 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {tea.sender.slice(2, 4).toUpperCase()}
          </div>
          <div>
            <p className="font-mono text-sm text-white/80">
              {formatAddress(tea.sender)}
            </p>
            <p className="text-xs text-white/60">
              {formatDate(tea.timestamp)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-purple-300">
            {formatAmount(tea.amount, tea.currency)} {tea.currency}
          </p>
          <p className="text-xs text-white/60">☕️</p>
        </div>
      </div>
      <p className="text-white/90 bg-white/10 rounded-lg p-2 text-sm">
        "{tea.message}"
      </p>
    </motion.div>
  );
};

interface TeaFeedProps {
  contractAddress: string;
}

export const TeaFeed: React.FC<TeaFeedProps> = ({ contractAddress }) => {
  const { data: teas, isLoading, error } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CRYPTO_TEA_ABI,
    functionName: 'getAllTeas',
  });

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Gift className="text-purple-400 w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Recent Teas</h2>
        <span className="text-2xl">🍃</span>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {isLoading && (
          <div className="text-center py-8">
            <LoadingSpinner variant="teacup" text="Loading teas..." />
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-red-300">
            <Coffee className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Failed to load teas. Please try again.</p>
          </div>
        )}
        
        {teas && teas.length > 0 ? (
          [...teas].reverse().map((tea, index) => (
            <TeaMessage 
              key={`${tea.sender}-${tea.timestamp}`} 
              tea={tea} 
              index={index} 
            />
          ))
        ) : teas && teas.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <Coffee className="w-12 h-12 mx-auto mb-4 text-white/30" />
            <p>No teas yet! Be the first to send one ☕️</p>
          </div>
        ) : null}
      </div>
    </Card>
  );
};