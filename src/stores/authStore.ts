import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser, signIn, signOut, signUp } from '../lib/supabase';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await signIn(email, password);
          
          if (error) throw new Error(error.message);
          
          if (data?.user) {
            set({ 
              user: {
                id: data.user.id,
                email: data.user.email || '',
                created_at: data.user.created_at || new Date().toISOString(),
              },
              isAuthenticated: true,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign in',
            isLoading: false
          });
        }
      },
      
      register: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await signUp(email, password);
          
          if (error) throw new Error(error.message);
          
          if (data?.user) {
            set({ 
              user: {
                id: data.user.id,
                email: data.user.email || '',
                created_at: data.user.created_at || new Date().toISOString(),
              },
              isAuthenticated: true,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign up',
            isLoading: false
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          const { error } = await signOut();
          if (error) throw new Error(error.message);
          
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign out',
            isLoading: false
          });
        }
      },
      
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const user = await getCurrentUser();
          
          if (user) {
            set({ 
              user: {
                id: user.id,
                email: user.email || '',
                created_at: user.created_at || '',
              },
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            set({ 
              user: null, 
              isAuthenticated: false,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Authentication check failed',
            isLoading: false,
            isAuthenticated: false
          });
        }
      },
      
      clearError: () => set({ error: null })
    }),
    {
      name: 'wellness-auth-storage',
    }
  )
);