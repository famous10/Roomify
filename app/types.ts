import { type ButtonHTMLAttributes, type ReactNode } from "react";

// User and Auth Types (from app/context/AuthContext.tsx)
export interface User {
  username: string;
  uuid?: string;
  email?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

// Puter window global
export interface PuterAuth {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isSignedIn: () => boolean;
  getUser: () => Promise<User>;
}

export interface PuterInstance {
  auth: PuterAuth;
}

declare global {
  interface Window {
    puter: PuterInstance;
  }
}

// Component Props (from app/components/Button.tsx)
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

// Common Utility Types
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}
