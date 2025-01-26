"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserSession {
    user: {
        id: string;
        display_name: string;
        email: string;
        images: { width: number; height: number; url: string }[];
    };
    token: {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
    };
}

interface SessionContextType {
    session: UserSession | null;
    setSession: React.Dispatch<React.SetStateAction<UserSession | null>>;
}

const ClientSessionProvider = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
    const context = useContext(ClientSessionProvider);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<UserSession | null>(null);

    useEffect(() => {
        const storedSession = localStorage.getItem('authSession'); // Or use cookies
        if (storedSession) {
            setSession(JSON.parse(storedSession));
        }
    }, []);

    return (
        <ClientSessionProvider.Provider value={{ session, setSession }}>
            {children}
        </ClientSessionProvider.Provider>
    );
};
