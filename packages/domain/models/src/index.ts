// @monorepo/models
export const packageName = "@monorepo/models";

// Core business models
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: string[]; // User IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string;
  userId: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export const version = '0.1.0';
