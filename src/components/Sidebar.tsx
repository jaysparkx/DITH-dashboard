import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  return (
    <div className="w-64 bg-edith-dark dark:bg-edith-darker h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">EDITH</h1>
        <p className="text-xs text-gray-400 mt-1">Ecosystem Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm transition-colors duration-200 hover:bg-gray-700/50 ${
              location.pathname === item.path
                ? 'text-edith-secondary bg-gray-700/30 border-r-2 border-edith-secondary'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-edith-secondary rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm text-white">User</p>
            <p className="text-xs text-gray-400">Premium Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;