import { useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Fetch the current user
    const fetchCurrentUser = async () => {
      try {
        // In a real implementation, this would be a fetch call to your auth endpoint
        const response = await Promise.resolve({
          id: 'user-1',
          email: 'user@example.com',
          name: 'Example User',
        });

        setAuthState({
          user: response,
          loading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: 'Failed to authenticate user',
        });
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState({
      ...authState,
      loading: true,
      error: null,
    });

    try {
      // In a real implementation, this would be a fetch call to your login endpoint
      const response = await Promise.resolve({
        id: 'user-1',
        email,
        name: 'Example User',
      });

      setAuthState({
        user: response,
        loading: false,
        error: null,
      });

      return response;
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Invalid email or password',
      });
      throw error;
    }
  };

  const logout = async () => {
    setAuthState({
      ...authState,
      loading: true,
    });

    try {
      // In a real implementation, this would be a fetch call to your logout endpoint
      await Promise.resolve();

      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Failed to logout',
      });
      throw error;
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
  };
}