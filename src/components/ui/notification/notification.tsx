import { useContext } from 'react';
import classes from './notification.module.css';
import NotificationContext from '../../../store/notification-context';

interface NotificationProps {
  title: string;
  message: string;
  status: 'success' | 'error' | 'warning' | 'info';
}

export default function Notification(props: NotificationProps) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'warning') {
    statusClasses = classes.warning;
  }

  if (status === 'info') {
    statusClasses = classes.info;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
