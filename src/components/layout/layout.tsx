import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import { PeraWalletConnect } from "@perawallet/connect";
import Notification from "../ui/notification/notification";
import NotificationContext from "../../store/notification-context";

interface LayoutProps {
  children: React.ReactNode;
  peraWallet: PeraWalletConnect;
  accountAddress: string;
  setAccountAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function Layout({children, peraWallet, accountAddress, setAccountAddress}: LayoutProps) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  
  return (
    <Fragment>
      <div className="page-container">
        <MainHeader 
          peraWallet={peraWallet}
          accountAddress={accountAddress}
          setAccountAddress={setAccountAddress}
        />
        <main className="body">
          {children}
        </main>
        {activeNotification && (
          <Notification 
            title={activeNotification.title} 
            message={activeNotification.message} 
            status={activeNotification.status}
          />
        )}
      </div>
    </Fragment>
  )
}
