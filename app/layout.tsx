import '@coinbase/onchainkit/styles.css';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
  description: 'Buy me a coffee/tea, but onchain',
  keywords: ['Web3', 'dApp', 'Base', 'Ethereum', 'Tips', 'Crypto', 'Tea', 'OnchainKit'],
  authors: [{ name: '@smilewithkhushi' }],
  creator: 'khushi',
  publisher: 'khushi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
