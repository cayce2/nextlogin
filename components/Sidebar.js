import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { X, Home, Settings, HelpCircle, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

const Sidebar = ({ isOpen, toggleSidebar, isExpanded, toggleExpanded, username }) => {
  const router = useRouter();
  
  const sidebarWidth = useMemo(() => isExpanded ? 'w-64' : 'w-20', [isExpanded]);
  const sidebarClasses = useMemo(() => `
    fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 ease-in-out 
    bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-auto ${sidebarWidth} 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `, [isOpen, sidebarWidth]);

  const isActive = useCallback((path) => router.pathname === path, [router.pathname]);

  const NavLink = useMemo(() => ({ href, icon: Icon, children }) => (
    <Link href={href} className={`
      flex items-center px-2 py-2 text-base font-medium rounded-md 
      ${isActive(href) ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} 
      group ${isExpanded ? '' : 'justify-center'}
    `}>
      <Icon className={`h-6 w-6 ${isActive(href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
      {isExpanded && <span className="ml-3">{children}</span>}
    </Link>
  ), [isActive, isExpanded]);

  const ErrorFallback = ({ error }) => (
    <div className="text-red-500 p-4">
      <h2 className="text-lg font-bold">Oops! Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  );

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden 
        ${isOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'}`} 
        onClick={toggleSidebar}
      />
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-2xl font-bold text-indigo-600">Menu</span>
          <button 
            onClick={toggleSidebar} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <NavLink href="/dashboard" icon={Home}>Home</NavLink>
            <NavLink href="/settings" icon={Settings}>Settings</NavLink>
            <NavLink href="/help" icon={HelpCircle}>Help</NavLink>
          </div>
        </nav>
        <div className={`flex-shrink-0 flex border-t border-gray-200 p-4 ${isExpanded ? '' : 'flex-col items-center'}`}>
          {isExpanded ? (
            <>
              <div className="flex items-center flex-shrink-0">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              aria-label="Logout"
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
    </ErrorBoundary>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Sidebar;