import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';

const Dashboard = () => {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <p className="text-xl text-gray-800">
            Welcome, {user && user.email}<br/>
            Now You Can Logout Successfully!!!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
