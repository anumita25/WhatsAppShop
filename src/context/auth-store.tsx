import { createContext, ReactNode, useContext, useState } from 'react';

type AuthStore = { loggedIn: boolean; profileOpen: boolean; login: () => void; logout: () => void; openProfile: () => void; closeProfile: () => void };
const AuthContext = createContext<AuthStore | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) { const [loggedIn, setLoggedIn] = useState(false); const [profileOpen, setProfileOpen] = useState(false); return <AuthContext.Provider value={{ loggedIn, profileOpen, login: () => setLoggedIn(true), logout: () => { setProfileOpen(false); setLoggedIn(false); }, openProfile: () => setProfileOpen(true), closeProfile: () => setProfileOpen(false) }}>{children}</AuthContext.Provider>; }
export function useAuth() { const store = useContext(AuthContext); if (!store) throw new Error('useAuth must be used within AuthProvider'); return store; }
