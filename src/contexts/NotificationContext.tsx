import { createContext } from 'react';
import { NotificationType } from '../components/common/Notification/Notification';

interface NotificationContextProps {
  showNotification: (type: NotificationType, message: string) => void;
}

export const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);