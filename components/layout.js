import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory

const Layout = ({ children, username }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarExpanded = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar toggleMobileSidebar={toggleMobileSidebar} />
      <div className="flex-grow flex overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleMobileSidebar}
          isExpanded={isSidebarExpanded}
          toggleExpanded={toggleSidebarExpanded}
          username={username}
          onLogout={() => {/* Implement logout if needed */}}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
