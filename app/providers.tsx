'use client';

import { base } from 'wagmi/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';

//the env variables - kp
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '84532');
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.base.org';


export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{ appearance: { 
            mode: 'auto',
        },
        wallet: {
          display: 'modal',
        }
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}

