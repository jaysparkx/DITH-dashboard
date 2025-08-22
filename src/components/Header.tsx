import React from 'react';
import { BellIcon, SunIcon, MoonIcon, WalletIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-edith-dark border-b border-gray-200 dark:border-gray-700 fixed top-0 right-0 left-64 h-16 z-10">
      <div className="flex items-center justify-end h-full px-6">
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isDark ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>

          {/* Network Status */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Celo Mainnet</span>
          </div>

          {/* Connect Wallet Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-edith-primary hover:bg-edith-primary/90 text-white rounded-lg transition-colors duration-200 font-medium text-sm">
            <WalletIcon className="w-4 h-4" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;