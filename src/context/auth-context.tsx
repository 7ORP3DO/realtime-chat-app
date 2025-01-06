import { createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import useAuth from '../hooks/useAuth';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isInitializing: boolean;
    error: string | null;
    initializeUser: (name: string) => Promise<User | null>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuthContext must be used within an AuthProvider');
    return context;
}
