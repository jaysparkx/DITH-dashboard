import React from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import {
  BuildingStorefrontIcon,
  SparklesIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const RWAMarket: React.FC = () => {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className={`${isCollapsed ? 'ml-16' : 'ml-[280px]'} pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-[#3a3a3a] rounded-2xl p-12 shadow-2xl border border-gray-700/50 max-w-lg">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <BuildingStorefrontIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">RWA Marketplace</h1>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Discover, trade, and invest in tokenized real-world assets including GPU clusters, real estate, energy projects, and commodities. Advanced marketplace features with professional trading tools.
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 rounded-xl text-sm font-medium shadow-lg">
                <SparklesIcon className="w-5 h-5 mr-2" />
                Coming Soon - Q1 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RWAMarket;