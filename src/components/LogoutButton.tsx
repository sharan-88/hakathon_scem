'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear all cookies
    Cookies.remove('isLoggedIn', { path: '/' });
    Cookies.remove('userRole', { path: '/' });
    
    // Force a small delay to ensure cookies are cleared
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Redirect to home page and refresh
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      Logout
    </button>
  );
} 