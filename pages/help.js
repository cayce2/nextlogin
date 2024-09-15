import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/layout'; 

export default function Help() {
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
          <h1 className="text-2xl font-semibold text-gray-900">Help & Support</h1>
          <p className="mt-2 text-gray-600">How can we help you? Browse the FAQs or contact support for assistance.</p>
        </div>
      </div>
    </Layout>
  );
}
