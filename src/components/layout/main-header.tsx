import Link from "next/link";
import classes from './main-header.module.css';
import Button from "../ui/button/button";
import { PeraWalletConnect } from "@perawallet/connect";
import AlgorandContext from '../../store/algorand-context'
import { useContext, useEffect } from "react";

interface HeaderProps {
  peraWallet: PeraWalletConnect;
  accountAddress: string;
  setAccountAddress: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainHeader({peraWallet, accountAddress, setAccountAddress}: HeaderProps) {
  const algorandCtx = useContext(AlgorandContext);
  
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    if (isConnectedToPeraWallet) {
      algorandCtx.setWalletData(accountAddress, peraWallet);
    }
  }, [isConnectedToPeraWallet, algorandCtx, accountAddress, peraWallet]);

  return (
    <header className={`${classes.header} header`}>
      <div className={classes.logo}>
        <Link href='/'>Pixel War</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href='/store'>Store</Link>
            <Link href='/info'>Info</Link>
          </li>
        </ul>
      </nav>
      <div className={classes.peraButton}>
        <Button onClickHandler={
          isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick
        }>
          { isConnectedToPeraWallet ? `${accountAddress.substring(0, 4)}...${accountAddress.slice(-4)}` : `Connect Wallet` }
        </Button>
      </div>
    </header>
  )

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
}
