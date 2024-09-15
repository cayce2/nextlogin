import React from 'react';
import Layout from '../components/layout'; // Adjust the import path if necessary

export default function Settings() {
  const username = 'User'; // Replace with actual username logic

  return (
    <Layout username={username}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Here you can update your preferences and account settings.</p>
        </div>
      </div>
    </Layout>
  );
}
