import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Menu, X, Home, Settings, HelpCircle, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

const Navbar = ({ toggleMobileSidebar }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={toggleMobileSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <span className="text-2xl font-bold text-indigo-600">Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, toggleSidebar, isExpanded, toggleExpanded, username, onLogout }) => {
  const sidebarWidth = isExpanded ? 'w-64' : 'w-20';
  const sidebarClasses = `fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 ease-in-out bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-auto ${sidebarWidth} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;

  return (
    <>
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden ${isOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'}`} onClick={toggleSidebar}></div>
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-2xl font-bold text-indigo-600">Menu</span>
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <a href="#" className={`flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 bg-gray-100 group ${isExpanded ? '' : 'justify-center'}`}>
              <Home className="h-6 w-6 text-gray-500" />
              {isExpanded && <span className="ml-3">Home</span>}
            </a>
            <a href="#" className={`flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 group ${isExpanded ? '' : 'justify-center'}`}>
              <Settings className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              {isExpanded && <span className="ml-3">Settings</span>}
            </a>
            <a href="#" className={`flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 group ${isExpanded ? '' : 'justify-center'}`}>
              <HelpCircle className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              {isExpanded && <span className="ml-3">Help</span>}
            </a>
          </div>
        </nav>
        <div className={`flex-shrink-0 flex border-t border-gray-200 p-4 ${isExpanded ? '' : 'flex-col items-center'}`}>
          {isExpanded ? (
            <>
              <div className="flex items-center flex-shrink-0">
                <div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{username}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLogout}
              className="flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut className="h-6 w-6" />
            </button>
          )}
        </div>
        <button
          onClick={toggleExpanded}
          className="absolute right-0 top-20 transform translate-x-full bg-white rounded-r-md p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          {isExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>
    </>
  );
};

const WelcomeBanner = ({ username }) => {
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

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
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

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarExpanded = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar toggleMobileSidebar={toggleMobileSidebar} />
      <WelcomeBanner username={username} />
      <div className="flex-grow flex overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleMobileSidebar} 
          isExpanded={isSidebarExpanded}
          toggleExpanded={toggleSidebarExpanded}
          username={username} 
          onLogout={handleLogout} 
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Content</h1>
                <p className="mt-2 text-gray-600">This is where your main dashboard content would go.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}