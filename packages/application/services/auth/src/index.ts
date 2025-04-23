import { User } from '@monorepo/models';
import { BaseService, Service } from '@monorepo/services';
import { AuthProvider, InMemoryAuthProvider, UserInfo } from '@monorepo/auth';

export interface AuthService extends Service<User> {
  login(username: string, password: string): Promise<{ user: User; token: string; }>;
  register(username: string, email: string, password: string): Promise<{ user: User; token: string; }>;
  getCurrentUser(): Promise<User | null>;
  resetPassword(email: string): Promise<boolean>;
}

export class AuthServiceImpl extends BaseService<User> implements AuthService {
  private authProvider: AuthProvider;

  constructor() {
    super();
    this.authProvider = new InMemoryAuthProvider();
    
    // Initialize with demo data
    const now = new Date();
    this.items = [
      {
        id: 'user-1',
        username: 'admin',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        createdAt: now,
        updatedAt: now,
      },
    ];
  }

  async login(username: string, password: string): Promise<{ user: User; token: string; }> {
    const result = await this.authProvider.login(username, password);
    
    if (!result.success || !result.user || !result.token) {
      throw new Error(result.error || 'Login failed');
    }
    
    const user = await this.findOrCreateUserFromAuthUser(result.user);
    
    return {
      user,
      token: result.token,
    };
  }

  async register(username: string, email: string, password: string): Promise<{ user: User; token: string; }> {
    const result = await this.authProvider.register(username, email, password);
    
    if (!result.success || !result.user || !result.token) {
      throw new Error(result.error || 'Registration failed');
    }
    
    const user = await this.findOrCreateUserFromAuthUser(result.user);
    
    return {
      user,
      token: result.token,
    };
  }

  async getCurrentUser(): Promise<User | null> {
    const authUser = await this.authProvider.getCurrentUser();
    
    if (!authUser) {
      return null;
    }
    
    return this.findOrCreateUserFromAuthUser(authUser);
  }

  async resetPassword(email: string): Promise<boolean> {
    return this.authProvider.resetPassword(email);
  }

  private async findOrCreateUserFromAuthUser(authUser: UserInfo): Promise<User> {
    // Try to find the user by username
    const existingUser = this.items.find(u => u.username === authUser.username);
    
    if (existingUser) {
      return existingUser;
    }
    
    // Create a new user if not found
    const now = new Date();
    const newUser: User = {
      id: authUser.id,
      username: authUser.username,
      email: authUser.email,
      createdAt: now,
      updatedAt: now,
    };
    
    this.items.push(newUser);
    
    return newUser;
  }
}

// Export a singleton instance
export const authService = new AuthServiceImpl();