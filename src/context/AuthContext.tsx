import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';
import { User } from '../types/api';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const token = await SecureStore.getItemAsync('auth_token');
            if (token) {
                const response = await authService.getUser();
                if (response.success) {
                    setUser(response.data);
                } else {
                    // Si le token est invalide on le supprime (sauf si erreur réseau temporaire)
                    // Pour simplifier on assume invalide
                    await SecureStore.deleteItemAsync('auth_token');
                }
            }
        } catch (error) {
            console.error('Auth Check Error', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (token: string, newUser: User) => {
        await SecureStore.setItemAsync('auth_token', token);
        setUser(newUser);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
