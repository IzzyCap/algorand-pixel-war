import { useContext, useEffect, useState } from 'react'
import AlgorandContext from '@/store/algorand-context';
import Link from 'next/link';
import { PeraWalletConnect } from '@perawallet/connect';
import Button from '../ui/button/button';
import classes from './main-header.module.css';

interface HeaderProps {
  peraWallet: PeraWalletConnect;
  accountAddress: string;
  setAccountAddress: React.Dispatch<React.SetStateAction<string>>;
};

const MainHeader = ({peraWallet, accountAddress, setAccountAddress}: HeaderProps) => {
  const [showNavbar, setShowNavbar] = useState(false)

  const algorandCtx = useContext(AlgorandContext);
  
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    if (isConnectedToPeraWallet) {
      algorandCtx.setWalletData(accountAddress, peraWallet);
    }
  }, [isConnectedToPeraWallet, algorandCtx, accountAddress, peraWallet]);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
  
        setAccountAddress(newAccounts[0]);
        algorandCtx.setWalletData(newAccounts[0], peraWallet);
      }).catch(() => {
        console.log('PeraWalletConnectError: The modal has been closed by the user.');
      });
  }
  
  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress('');
    algorandCtx.disconnectWallet();
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link href='/'>Pixel War</Link>
        </div>
        <div className={classes.menuIcon} onClick={handleShowNavbar}>
          <img alt='Helmet Dropdown' src='/icons/burger.svg'></img>
        </div>
        <div className={`${classes.navElements} ${showNavbar && classes.active}`}>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/store'>Store</Link>
            </li>
            <li>
              <Link href='/info'>Info</Link>
            </li>
          </ul>
        </div>
        <Button onClickHandler={
          isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick
        }>
          { isConnectedToPeraWallet ? `${accountAddress.substring(0, 4)}...${accountAddress.slice(-4)}` : `Connect Wallet` }
        </Button>
      </div>
    </nav>
  )
}

export default MainHeader
