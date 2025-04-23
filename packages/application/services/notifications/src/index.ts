
export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export class NotificationService {
  async send(userId: string, message: string, type: Notification['type'] = 'info') {
    // Implementation
  }

  async markAsRead(notificationId: string) {
    // Implementation
  }
}
