import { Settings } from '@monorepo/models';
import { BaseService, Service } from '@monorepo/services';

export interface SettingsService extends Service<Settings> {
  getByUserId(userId: string): Promise<Settings>;
  updateTheme(userId: string, theme: 'light' | 'dark' | 'system'): Promise<Settings>;
  updateNotifications(userId: string, notifications: boolean): Promise<Settings>;
  updateLanguage(userId: string, language: string): Promise<Settings>;
}

export class SettingsServiceImpl extends BaseService<Settings> implements SettingsService {
  constructor() {
    super();
    // Initialize with demo data
    this.items = [
      {
        id: 'settings-1',
        userId: 'user-1',
        theme: 'system',
        notifications: true,
        language: 'en',
        updatedAt: new Date(),
      },
    ];
  }

  async getByUserId(userId: string): Promise<Settings> {
    const settings = this.items.find(item => item.userId === userId);
    
    if (!settings) {
      // Create default settings for user
      return this.create({
        userId,
        theme: 'system',
        notifications: true,
        language: 'en',
        updatedAt: new Date(),
      });
    }
    
    return settings;
  }

  async updateTheme(userId: string, theme: 'light' | 'dark' | 'system'): Promise<Settings> {
    const settings = await this.getByUserId(userId);
    
    return this.update(settings.id, {
      theme,
      updatedAt: new Date(),
    });
  }

  async updateNotifications(userId: string, notifications: boolean): Promise<Settings> {
    const settings = await this.getByUserId(userId);
    
    return this.update(settings.id, {
      notifications,
      updatedAt: new Date(),
    });
  }

  async updateLanguage(userId: string, language: string): Promise<Settings> {
    const settings = await this.getByUserId(userId);
    
    return this.update(settings.id, {
      language,
      updatedAt: new Date(),
    });
  }
}

// Export a singleton instance
export const settingsService = new SettingsServiceImpl();