import AppTabs from '@/components/app-tabs';
import Login from '@/app/login';
import ProfileScreen from '@/components/profile-screen';
import { AuthProvider, useAuth } from '@/context/auth-store';
import { ShopProvider } from '@/context/shop-store';

export default function RootLayout() {
  return <AuthProvider><ShopProvider><AppContent /></ShopProvider></AuthProvider>;
}
function AppContent() { const { loggedIn, profileOpen } = useAuth(); if (!loggedIn) return <Login />; return profileOpen ? <ProfileScreen /> : <AppTabs />; }
