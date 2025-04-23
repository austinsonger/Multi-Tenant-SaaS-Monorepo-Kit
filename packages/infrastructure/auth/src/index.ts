// @monorepo/auth
export const packageName = "@monorepo/auth";

// Authentication interfaces and implementations
export interface AuthProvider {
  login(username: string, password: string): Promise<AuthResult>;
  logout(): Promise<void>;
  register(username: string, email: string, password: string): Promise<AuthResult>;
  getCurrentUser(): Promise<UserInfo | null>;
  resetPassword(email: string): Promise<boolean>;
}

export interface AuthResult {
  success: boolean;
  user?: UserInfo;
  token?: string;
  error?: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Basic in-memory auth provider implementation
export class InMemoryAuthProvider implements AuthProvider {
  private users: Record<string, { id: string; username: string; email: string; password: string; role: string }> = {};
  private currentUser: UserInfo | null = null;
  private token: string | null = null;

  async login(username: string, password: string): Promise<AuthResult> {
    const user = Object.values(this.users).find(u => u.username === username && u.password === password);
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid username or password'
      };
    }

    this.currentUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    this.token = Math.random().toString(36).substring(2);
    
    return {
      success: true,
      user: this.currentUser,
      token: this.token
    };
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.token = null;
  }

  async register(username: string, email: string, password: string): Promise<AuthResult> {
    if (Object.values(this.users).some(u => u.username === username)) {
      return {
        success: false,
        error: 'Username already exists'
      };
    }

    const id = Math.random().toString(36).substring(2, 9);
    this.users[id] = {
      id,
      username,
      email,
      password,
      role: 'user'
    };

    return this.login(username, password);
  }

  async getCurrentUser(): Promise<UserInfo | null> {
    return this.currentUser;
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = Object.values(this.users).find(u => u.email === email);
    return !!user;
  }
}

export const version = '0.1.0';
