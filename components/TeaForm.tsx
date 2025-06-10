import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, parseUnits } from 'viem';

import { Carrot } from 'lucide-react';
import { Button } from './ui/ButtonComponent';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { useToast } from './ui/Toast';
import { Card } from './ui/CardComponent';

const CRYPTO_TEA_ABI = [
  {
    inputs: [{ name: "message", type: "string" }],
    name: "buyTeaWithETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "message", type: "string" }
    ],
    name: "buyTeaWithUSDT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

interface TeaFormProps {
  contractAddress: string;
  usdtAddress: string;
}

export const TeaForm: React.FC<TeaFormProps> = ({ contractAddress, usdtAddress }) => {
  const { isConnected } = useAccount();
  const { success, error } = useToast();
  
  const [currency, setCurrency] = useState<'ETH' | 'USDT'>('ETH');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  
  const { writeContract, isPending, data: hash } = useWriteContract();
  
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const presetAmounts = {
    ETH: ['0.001', '0.005', '0.01', '0.02'],
    USDT: ['1', '5', '10', '25']
  };

  const handleSubmit = async () => {
    if (!amount || !message.trim()) {
      error('Please fill in all fields');
      return;
    }

    try {
      if (currency === 'ETH') {
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: CRYPTO_TEA_ABI,
          functionName: 'buyTeaWithETH',
          args: [message],
          value: parseEther(amount)
        });
      } else {
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: CRYPTO_TEA_ABI,
          functionName: 'buyTeaWithUSDT',
          args: [parseUnits(amount, 6), message]
        });
      }
      
      success(`Tea tip sent! ${amount} ${currency}`);
      setAmount('');
      setMessage('');
    } catch (err) {
      error('Transaction failed. Please try again.');
    }
  };

  if (!isConnected) {
    return (
      <Card className="text-center">
        <div className="py-8">
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-bold text-white mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-white/70">
            Connect your wallet to start sending teas! ☕️
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="text-center mb-6">
        <motion.div
          className="text-6xl mb-2"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          ☕️
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Send a Tea ✨</h2>
        <p className="text-white/70">Choose your preferred way to tip!</p>
      </div>

      <div className="space-y-6">
        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-3">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['ETH', 'USDT'] as const).map((curr) => (
              <motion.button
                key={curr}
                onClick={() => {
                  setCurrency(curr);
                  setAmount('');
                }}
                className={`p-4 rounded-xl font-medium transition-all ${
                  currency === curr
                    ? 'btn-cute text-white'
                    : 'glass-card text-white/80 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {curr} {curr === 'ETH' ? '⚡' : '💵'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Preset Amounts */}
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-3">
            Quick Amounts
          </label>
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts[currency].map((preset) => (
              <motion.button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  amount === preset
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {preset} {currency}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <Input
          label="Custom Amount"
          type="number"
          className="text-black"
          step="any"
          min="0"
          placeholder={`Enter ${currency} amount`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          rightElement={
            <span className="text-white font-medium text-sm">
              {currency}
            </span>
          }
        />

        {/* Message */}
        <Textarea
          label="Sweet Message 💌"
          placeholder="Leave a lovely message... ☁️"
          value={message}
          className='text-black'
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          showCount
          rows={3}
        />

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!amount || !message.trim() || isPending || isConfirming}
          isLoading={isPending || isConfirming}
          className="w-full"
          size="lg"
        >
          {isPending || isConfirming ? (
            <LoadingSpinner variant="brewing" text="Brewing your tea..." />
          ) : (
            `Send ${amount || '0'} ${currency} & Buy Tea ☕️`
          )}
        </Button>
      </div>
    </Card>
  );
};