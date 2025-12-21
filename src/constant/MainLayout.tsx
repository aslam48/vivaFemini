import React, { useState, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdTrackChanges } from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';
import Girl from '../assets/emma.jpg'
// import Tracker from '../assets/tracker.png'
// import Report from '../assets/report.png'
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

interface MainLayoutProps {
  children: React.ReactNode;
}

type TabType = '/' | 'tracking' | 'health-report';

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const path = window.location.pathname.slice(1) || '/';
    return path as TabType;
  });

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update browser URL without page reload
    window.history.pushState({}, '', `/${tab}`);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || '/';
      setActiveTab(path as TabType);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navItems = [
    { id: '/' as TabType, label: 'home', icon: AiFillHome },
    { id: 'tracking' as TabType, label: 'Tracking', icon: MdTrackChanges },
    { id: 'health-report' as TabType, label: 'Health Report', icon: FaFileAlt },
  ];

 return (
    <main className="min-h-screen bg-white px-4 lg:px-10">
      {/* Header with inline navigation */}
      <header className=" pt-4 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <img src={Girl} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Good Morning 👋</p>
            <p className="text-sm font-semibold text-gray-800">Emmanuelle</p>
          </div>
        </div>

        {/* Center: Navigation */}
        
        <nav className="hidden lg:flex  items-center gap-2 bg-[#F3F4F6] p-2 rounded-3xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`
                  flex items-center flex-col min-w-30 py-2 rounded-full transition-all duration-300
                  ${
                    isActive
                      ? ' bg-tab-active text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <Icon className={`text-base ${isActive ? 'text-white' : 'text-gray-600'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className='flex items-center gap-4'>
            <IoIosNotificationsOutline size={32}/>
            <CiSettings size={32}/>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-4">{children}</main>
    </main>
  );
};

export default MainLayout;