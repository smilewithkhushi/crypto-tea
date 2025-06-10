import React from 'react';
import { motion } from 'framer-motion';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownLink, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { Card } from './ui/CardComponent';

interface WalletConnectProps {
  className?: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ className = '' }) => {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <motion.div 
        className={className}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <EthBalance />
          </Identity>
          <WalletDropdownLink 
            icon="wallet" 
            href="https://wallet.coinbase.com"
            target="_blank"
          >
            Wallet
          </WalletDropdownLink>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </motion.div>
  );
};

// Connected wallet display component
export const ConnectedWallet: React.FC = () => {
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) return null;

  return (
    <Card variant="subtle" padding="sm" className="inline-block">
      <div className="flex items-center gap-3">
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
        <span className="font-mono text-white font-semibold text-sm">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
      </div>
    </Card>
  )
}