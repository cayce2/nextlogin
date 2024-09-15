import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'; // Adjust the path as needed
import axios from 'axios';
import { useRouter } from 'next/router';

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

  return (
    <Layout username={username}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Content</h1>
          <p className="mt-2 text-gray-600">This is where your main dashboard content would go.</p>
        </div>
      </div>
    </Layout>
  );
}
