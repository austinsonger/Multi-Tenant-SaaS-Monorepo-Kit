// Export auth related utilities and types
export const packageName = "@monorepo/auth";

// Auth provider interface
export interface AuthProvider {
  login(username: string, password: string): Promise<AuthResult>;
  logout(): Promise<void>;
  register(username: string, email: string, password: string): Promise<AuthResult>;
  getCurrentUser(): Promise<UserInfo | null>;
  resetPassword(email: string): Promise<boolean>;
}

// Auth result interface
export interface AuthResult {
  success: boolean;
  user?: UserInfo;
  token?: string;
  error?: string;
}

// User info interface
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: string;
}

// In-memory auth provider implementation
export class InMemoryAuthProvider implements AuthProvider {
  private users: Record<string, { id: string; username: string; email: string; password: string; role: string }> = {};
  private currentUser: UserInfo | null = null;
  private token: string | null = null;

  constructor() {
    // Initialize with a default user
    const defaultUser = {
      id: 'user-1',
      username: 'admin',
      email: 'admin@example.com',
      password: 'password',
      role: 'admin',
    };
    this.users[defaultUser.username] = defaultUser;
  }

  async login(username: string, password: string): Promise<AuthResult> {
    const user = this.users[username];
    
    if (!user || user.password !== password) {
      return {
        success: false,
        error: 'Invalid username or password',
      };
    }

    this.currentUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    
    this.token = `token-${Date.now()}`;
    
    return {
      success: true,
      user: this.currentUser,
      token: this.token,
    };
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.token = null;
  }

  async register(username: string, email: string, password: string): Promise<AuthResult> {
    if (this.users[username]) {
      return {
        success: false,
        error: 'Username already exists',
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      role: 'user',
    };
    
    this.users[username] = newUser;
    
    this.currentUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };
    
    this.token = `token-${Date.now()}`;
    
    return {
      success: true,
      user: this.currentUser,
      token: this.token,
    };
  }

  async getCurrentUser(): Promise<UserInfo | null> {
    return this.currentUser;
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = Object.values(this.users).find(u => u.email === email);
    
    if (!user) {
      return false;
    }
    
    // In a real implementation, this would generate a reset token and send an email
    console.log(`Password reset initiated for ${email}`);
    
    return true;
  }
}

export const version = '0.1.0';