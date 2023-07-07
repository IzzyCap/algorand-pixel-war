import { PeraWalletConnect } from '@perawallet/connect';
import React, { createContext, useState } from 'react';

interface AlgorandContextType {
  accountAddress: string;
  peraWallet: PeraWalletConnect | null;
  setWalletData: (accountAddress: string, peraWallet: PeraWalletConnect) => void;
  disconnectWallet: () => void;
}

interface AlgorandContextProviderProps {
  children: React.ReactNode;
}

const AlgorandContext = createContext<AlgorandContextType>({
  accountAddress: '',
  peraWallet: null,
  setWalletData: () => {},
  disconnectWallet: () => {},
});

export const AlgorandContextProvider: React.FC<AlgorandContextProviderProps> = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState<string>('');
  const [peraWallet, setPeraWallet] = useState<PeraWalletConnect | null>(null);

  const setWalletData = (newAccountAddress: string, newPeraWallet: PeraWalletConnect) => {
    setAccountAddress(newAccountAddress);
    setPeraWallet(newPeraWallet);
  };

  const disconnectWallet = () => {
    setAccountAddress('');
    setPeraWallet(null);
  }

  const context = {
    accountAddress,
    peraWallet,
    setWalletData,
    disconnectWallet,
  };

  return (
    <AlgorandContext.Provider value={context}>
      {children}
    </AlgorandContext.Provider>
  );
};

export default AlgorandContext;
