import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import {
  HomeIcon,
  CubeIcon,
  BanknotesIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
  UsersIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'EDITH Dashboard', icon: HomeIcon, path: '/' },
  { name: 'RWA Vault', icon: CubeIcon, path: '/rwa-vault' },
  { name: 'Yield Vaults', icon: BanknotesIcon, path: '/yield-vaults' },
  { name: 'Assets Monitoring', icon: ChartBarIcon, path: '/assets-monitoring' },
  { name: 'RWA Market', icon: ShoppingBagIcon, path: '/rwa-market' },
  { name: 'Transaction History', icon: ClockIcon, path: '/transaction-history' },
  { name: 'cUSD Management', icon: CurrencyDollarIcon, path: '/cusd-management' },
  { name: 'AI Services', icon: CpuChipIcon, path: '/ai-services' },
  { name: 'Governance', icon: UsersIcon, path: '/governance' },
  { name: 'Protocol Analytics', icon: ChartPieIcon, path: '/protocol-analytics' },
  { name: 'Settings & Account', icon: Cog6ToothIcon, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();

  // Defensive programming to prevent extension errors
  const safeLocation = location || { pathname: '/' };
  const safeToggleSidebar = toggleSidebar || (() => {});
  const safeIsCollapsed = isCollapsed ?? false;

  return (
    <div className={`${safeIsCollapsed ? 'w-16' : 'w-[280px]'} bg-[#1a1a1a] h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 z-30 shadow-2xl`}>
      {/* Logo */}
      <div className="px-6 py-8 border-b border-gray-800/50">
        {!safeIsCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EDITH</h1>
              <p className="text-xs text-gray-400">Ecosystem Dashboard</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
          </div>
        )}
        
        {/* Toggle Button */}
        <button
          onClick={safeToggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          {safeIsCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            if (!item || !item.name || !item.path || !item.icon) return null;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center mx-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 group relative ${
                  safeLocation.pathname === item.path
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                } ${safeIsCollapsed ? 'justify-center' : ''}`}
                title={safeIsCollapsed ? item.name : ''}
              >
                <item.icon className={`w-5 h-5 ${safeIsCollapsed ? '' : 'mr-4'} flex-shrink-0`} />
                {!safeIsCollapsed && (
                  <span className="truncate font-medium">{item.name}</span>
                )}
                
                {/* Active indicator */}
                {safeLocation.pathname === item.path && !safeIsCollapsed && (
                  <div className="absolute right-4 w-2 h-2 bg-white rounded-full"></div>
                )}
                
                {/* Tooltip for collapsed state */}
                {safeIsCollapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl">
                    {item.name}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-800/50">
        {!safeIsCollapsed ? (
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-lg">
              <span className="text-sm">U</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white font-medium truncate">User Account</p>
              <p className="text-xs text-gray-400 truncate">Premium Plan</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg relative">
              <span className="text-xs">U</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;