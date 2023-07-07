'use client'
import { NotificationContextProvider } from '@/store/notification-context'
import './globals.css'
import { Inter } from 'next/font/google'
import { AlgorandContextProvider } from '@/store/algorand-context'
import Head from 'next/head';
import { PeraWalletConnect } from '@perawallet/connect';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout'

const inter = Inter({ subsets: ['latin'] })

// Create the PeraWalletConnect instance outside of the component
export const peraWallet = new PeraWalletConnect();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [accountAddress, setAccountAddress] = useState('');
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
      }
    }).catch(() => {
      console.log('Not connected');
    });
  }, []);

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress('');
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <title>Algorand Pixel War</title>
        <meta name='description' content='Buy Pixels to draw them as you want, pixels are NFTs from Algorand Blockchain.' />
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <body className={inter.className}>
        <AlgorandContextProvider>
          <NotificationContextProvider>
            <Layout
              peraWallet={peraWallet}
              accountAddress={accountAddress}
              setAccountAddress={setAccountAddress}
            >
              {children}
            </Layout>
          </NotificationContextProvider>
        </AlgorandContextProvider>
      </body>
    </html>
  )
}
