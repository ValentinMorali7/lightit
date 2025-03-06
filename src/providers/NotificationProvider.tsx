import React, { useState, ReactNode } from 'react';
import Notification, { NotificationType } from '../components/common/Notification/Notification';
import { NotificationContext } from '../contexts/NotificationContext';

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState<NotificationType>('info');
  const [message, setMessage] = useState('');

  const showNotification = (notificationType: NotificationType, notificationMessage: string) => {
    setType(notificationType);
    setMessage(notificationMessage);
    setIsVisible(true);
  };

  const hideNotification = () => {
    setIsVisible(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        type={type}
        message={message}
        isVisible={isVisible}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
};