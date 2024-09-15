// components/WelcomeBanner.js

import React from 'react';

export const WelcomeBanner = ({ username }) => {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-medium text-white">
            Welcome to your Dashboard, {username}!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
