import { User, Team, Settings, AuditLog } from '@monorepo/models';

// Storage provider interface
export interface StorageProvider {
  // User operations
  getUser(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: Omit<User, 'id'>): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  listUsers(): Promise<User[]>;
  
  // Team operations
  getTeam(id: string): Promise<Team | null>;
  createTeam(team: Omit<Team, 'id'>): Promise<Team>;
  updateTeam(id: string, data: Partial<Team>): Promise<Team>;
  deleteTeam(id: string): Promise<boolean>;
  listTeams(): Promise<Team[]>;
  
  // Settings operations
  getSettings(id: string): Promise<Settings | null>;
  getSettingsByUserId(userId: string): Promise<Settings | null>;
  createSettings(settings: Omit<Settings, 'id'>): Promise<Settings>;
  updateSettings(id: string, data: Partial<Settings>): Promise<Settings>;
  
  // Audit log operations
  createAuditLog(log: Omit<AuditLog, 'id'>): Promise<AuditLog>;
  listAuditLogs(filter?: { userId?: string; resourceType?: string }): Promise<AuditLog[]>;
}

// In-memory storage implementation
export class InMemoryStorageProvider implements StorageProvider {
  private users: User[] = [];
  private teams: Team[] = [];
  private settings: Settings[] = [];
  private auditLogs: AuditLog[] = [];

  // User operations
  async getUser(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.users.find(u => u.username === username) || null;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const id = `user-${Date.now()}`;
    const user = { ...userData, id };
    this.users.push(user);
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      return false;
    }
    
    this.users.splice(index, 1);
    return true;
  }

  async listUsers(): Promise<User[]> {
    return this.users;
  }

  // Team operations
  async getTeam(id: string): Promise<Team | null> {
    return this.teams.find(t => t.id === id) || null;
  }

  async createTeam(teamData: Omit<Team, 'id'>): Promise<Team> {
    const id = `team-${Date.now()}`;
    const team = { ...teamData, id };
    this.teams.push(team);
    return team;
  }

  async updateTeam(id: string, data: Partial<Team>): Promise<Team> {
    const index = this.teams.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Team with id ${id} not found`);
    }
    
    this.teams[index] = { ...this.teams[index], ...data };
    return this.teams[index];
  }

  async deleteTeam(id: string): Promise<boolean> {
    const index = this.teams.findIndex(t => t.id === id);
    if (index === -1) {
      return false;
    }
    
    this.teams.splice(index, 1);
    return true;
  }

  async listTeams(): Promise<Team[]> {
    return this.teams;
  }

  // Settings operations
  async getSettings(id: string): Promise<Settings | null> {
    return this.settings.find(s => s.id === id) || null;
  }

  async getSettingsByUserId(userId: string): Promise<Settings | null> {
    return this.settings.find(s => s.userId === userId) || null;
  }

  async createSettings(settingsData: Omit<Settings, 'id'>): Promise<Settings> {
    const id = `settings-${Date.now()}`;
    const settings = { ...settingsData, id };
    this.settings.push(settings);
    return settings;
  }

  async updateSettings(id: string, data: Partial<Settings>): Promise<Settings> {
    const index = this.settings.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Settings with id ${id} not found`);
    }
    
    this.settings[index] = { ...this.settings[index], ...data };
    return this.settings[index];
  }

  // Audit log operations
  async createAuditLog(logData: Omit<AuditLog, 'id'>): Promise<AuditLog> {
    const id = `log-${Date.now()}`;
    const log = { ...logData, id };
    this.auditLogs.push(log);
    return log;
  }

  async listAuditLogs(filter?: { userId?: string; resourceType?: string }): Promise<AuditLog[]> {
    let logs = this.auditLogs;
    
    if (filter) {
      if (filter.userId) {
        logs = logs.filter(log => log.userId === filter.userId);
      }
      
      if (filter.resourceType) {
        logs = logs.filter(log => log.resourceType === filter.resourceType);
      }
    }
    
    return logs;
  }
}

// Export a singleton instance
export const storage = new InMemoryStorageProvider();