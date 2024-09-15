import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/layout'; 

export default function Settings() {
  

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