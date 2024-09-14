import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/user');
        setUsername(data.username);
      } catch (error) {
        router.push('/');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Welcome to your Dashboard</h2>
                <p>Hello, {username}! You're logged in.</p>
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}