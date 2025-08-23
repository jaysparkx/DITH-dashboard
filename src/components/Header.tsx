import React from 'react';
import { BellIcon, WalletIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useSidebar } from '../contexts/SidebarContext';

const Header: React.FC = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <header className={`bg-[#2a2a2a] border-b border-gray-700/50 fixed top-0 right-0 ${isCollapsed ? 'left-16' : 'left-[280px]'} h-16 z-20 transition-all duration-300 shadow-sm`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Side - Mobile Burger Button */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700/50 transition-all duration-200">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Network Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-green-900/30 text-green-400 rounded-lg border border-green-700/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Celo Mainnet</span>
          </div>

          {/* Connect Wallet Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-lg">
            <WalletIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;