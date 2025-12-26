import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import Girl from "../assets/emma.jpg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetUser } from "../services/fetchApi";

interface MainLayoutProps {
  children: React.ReactNode;
}

type TabType = "/" | "tracking" | "health-report";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dashboardData } = useGetUser()

  const userName = dashboardData?.[0]?.name;


  const activeTab = location.pathname as TabType;

  const handleTabChange = (tab: TabType) => {
    navigate(tab);
  };

  const navItems = [
    { id: "/" as TabType, label: "home", icon: AiFillHome },
    { id: "/tracking" as TabType, label: "Tracking", icon: MdTrackChanges },
    {
      id: "/health-report" as TabType,
      label: "Health Report",
      icon: FaFileAlt,
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-20 lg:pb-0">
      {/* Header with inline navigation */}
      <header className="pt-4 px-4 lg:px-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <img
              src={Girl}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Good Morning 👋</p>
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
          </div>
        </div>
        {/* Center: Navigation - Desktop Only */}

        <nav className="hidden lg:flex items-center gap-2 bg-[#F3F4F6] p-2 rounded-3xl">
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
                      ? " bg-tab-active text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                <Icon
                  className={`text-base ${
                    isActive ? "text-white" : "text-gray-600"
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <IoIosNotificationsOutline size={32} />
          <CiSettings size={32} />
        </div>
      </header>
      {/* Main Content */}
      <main className="pt-4 px-4 lg:px-10">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`
                  flex flex-col cursor-pointer items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 flex-1
                  ${isActive ? "bg-tab-active text-white" : "text-gray-600"}
                `}
              >
                <Icon
                  className={`text-xl ${
                    isActive ? "text-white" : "text-gray-600"
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
};

export default MainLayout;
