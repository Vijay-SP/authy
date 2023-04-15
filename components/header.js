import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-gray-800 text-white py-4 px-6 w-full">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <p className="font-bold text-xl">My Authy</p>
        </Link>
        {user && (
          <Link href="/dashboard">
            <p className="hover:text-gray-500">Dashboard</p>
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link href="/signin">
              <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</p>
            </Link>
            <Link href="/signup">
              <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </p>
            </Link>
          </>
        ) : (
          <>
            <p>{user.email}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
