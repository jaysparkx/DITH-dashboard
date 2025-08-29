import React, { useState } from 'react';
import {
  CpuChipIcon,
  BuildingOfficeIcon,
  BoltIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  FireIcon,
  PlayIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useSidebar } from '../contexts/SidebarContext';

interface Asset {
  id: number;
  name: string;
  type: 'gpu' | 'real-estate' | 'energy' | 'financial';
  location: string;
  status: 'active' | 'maintenance' | 'offline' | 'degraded' | 'preparation' | 'presale';
  utilization: number;
  revenue24h: string;
  temperature?: number;
  occupancy?: number;
  generation?: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
  alerts?: string[];
  // Additional fields for different phases
  saleProgress?: number; // For presale phase (0-100%)
  setupProgress?: number; // For preparation phase (0-100%)
  estimatedCompletion?: string; // For preparation phase
}

const assets: Asset[] = [
  // Live Assets (Currently Active)
  {
    id: 1,
    name: 'GPU Cluster #3',
    type: 'gpu',
    location: 'Iceland Data Center',
    status: 'active',
    utilization: 94,
    revenue24h: '$284.50',
    temperature: 72,
    trend: 'up',
    lastUpdate: '2 min ago',
  },
  {
    id: 2,
    name: 'GPU Cluster #7',
    type: 'gpu',
    location: 'Singapore Hub',
    status: 'maintenance',
    utilization: 0,
    revenue24h: '$0.00',
    temperature: 35,
    trend: 'down',
    lastUpdate: '15 min ago',
    alerts: ['Scheduled maintenance until 14:00 UTC'],
  },
  {
    id: 3,
    name: 'Miami Office Building',
    type: 'real-estate',
    location: 'Miami, FL',
    status: 'active',
    utilization: 87,
    revenue24h: '$1,250.00',
    occupancy: 87,
    trend: 'stable',
    lastUpdate: '1 hour ago',
  },
  {
    id: 4,
    name: 'London Retail Space',
    type: 'real-estate',
    location: 'London, UK',
    status: 'degraded',
    utilization: 65,
    revenue24h: '$890.00',
    occupancy: 65,
    trend: 'down',
    lastUpdate: '30 min ago',
    alerts: ['HVAC system requires attention', 'Tenant complaint received'],
  },
  {
    id: 5,
    name: 'Solar Farm #42',
    type: 'energy',
    location: 'Arizona Desert',
    status: 'active',
    utilization: 98,
    revenue24h: '$456.30',
    generation: 1.8,
    trend: 'up',
    lastUpdate: '5 min ago',
  },
  
  // In Progress Assets (Preparation Phase)
  {
    id: 8,
    name: 'GPU Cluster #9 - 12x H100',
    type: 'gpu',
    location: 'Dublin Data Center',
    status: 'preparation',
    utilization: 0,
    revenue24h: '$0.00',
    trend: 'stable',
    lastUpdate: '1 hour ago',
    setupProgress: 75,
    estimatedCompletion: 'Oct 05, 2025',
    alerts: ['Hardware delivery completed', 'Network setup in progress'],
  },
  {
    id: 9,
    name: 'Seattle Office Complex Unit A',
    type: 'real-estate',
    location: 'Seattle, WA',
    status: 'preparation',
    utilization: 0,
    revenue24h: '$0.00',
    trend: 'stable',
    lastUpdate: '3 hours ago',
    setupProgress: 45,
    estimatedCompletion: 'Jan 20, 2025',
    alerts: ['Legal documentation in progress', 'Tenant screening ongoing'],
  },
  {
    id: 10,
    name: 'Wind Farm #22 - 8MW',
    type: 'energy',
    location: 'Nebraska Plains',
    status: 'preparation',
    utilization: 0,
    revenue24h: '$0.00',
    trend: 'stable',
    lastUpdate: '6 hours ago',
    setupProgress: 30,
    estimatedCompletion: 'Mar 10, 2025',
    alerts: ['Turbine installation scheduled', 'Grid connection approved'],
  },
  
  // Presale Assets (Still Being Sold)
  {
    id: 11,
    name: 'GPU Cluster #12 - 20x H100',
    type: 'gpu',
    location: 'Frankfurt Data Center',
    status: 'presale',
    utilization: 0,
    revenue24h: '$0.00',
    trend: 'stable',
    lastUpdate: '30 min ago',
    saleProgress: 68,
  },
  {
    id: 12,
    name: 'Tokyo Commercial Tower Floor 15',
    type: 'real-estate',
    location: 'Tokyo, Japan',
    status: 'presale',
    utilization: 0,
    revenue24h: '$0.00',
    trend: 'stable',
    lastUpdate: '45 min ago',
    saleProgress: 42,
  },
  {
    id: 13,
    name: 'Solar Farm #55 - 5MW',
    type: 'energy',
    location: 'Nevada Desert',
    status: 'presale',
    utilization: 0,
    revenue24h: '$0.00',
    trend: 'stable',
    lastUpdate: '2 hours ago',
    saleProgress: 89,
  },
  {
    id: 14,
    name: 'DeFi Yield Strategy Portfolio',
    type: 'financial',
    location: 'Global',
    status: 'presale',
    utilization: 0,
    revenue24h: '$0.00',
    trend: 'stable',
    lastUpdate: '1 hour ago',
    saleProgress: 23,
  },
];

const AssetsMonitoring: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('live');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'gpu':
        return CpuChipIcon;
      case 'real-estate':
        return BuildingOfficeIcon;
      case 'energy':
        return BoltIcon;
      case 'financial':
        return CurrencyDollarIcon;
      default:
        return CpuChipIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'maintenance':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'offline':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'degraded':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      case 'preparation':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'presale':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircleIcon;
      case 'maintenance':
        return ClockIcon;
      case 'offline':
      case 'degraded':
        return ExclamationTriangleIcon;
      case 'preparation':
        return Cog6ToothIcon;
      case 'presale':
        return ShoppingBagIcon;
      default:
        return CheckCircleIcon;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      case 'stable':
        return '→';
      default:
        return '→';
    }
  };

  // Filter assets by active tab
  const getTabAssets = (tab: string) => {
    switch (tab) {
      case 'live':
        return assets.filter(asset => ['active', 'maintenance', 'offline', 'degraded'].includes(asset.status));
      case 'progress':
        return assets.filter(asset => asset.status === 'preparation');
      case 'presale':
        return assets.filter(asset => asset.status === 'presale');
      default:
        return assets;
    }
  };

  const tabAssets = getTabAssets(activeTab);
  
  const filteredAssets = tabAssets.filter(asset => {
    const typeMatch = filterType === 'all' || asset.type === filterType;
    const statusMatch = filterStatus === 'all' || asset.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const tabs = [
    { id: 'live', name: 'Live', icon: PlayIcon, description: 'Active and operational assets' },
    { id: 'progress', name: 'In Progress', icon: Cog6ToothIcon, description: 'Assets being prepared after sale completion' },
    { id: 'presale', name: 'Presale', icon: ShoppingBagIcon, description: 'Assets currently being sold' },
  ];

  const totalAssets = tabAssets.length;
  const activeAssets = tabAssets.filter(a => a.status === 'active').length;
  const avgUtilization = totalAssets > 0 ? tabAssets.reduce((sum, a) => sum + a.utilization, 0) / totalAssets : 0;
  // Only calculate revenue for live assets
  const total24hRevenue = activeTab === 'live' ? tabAssets.reduce((sum, asset) => {
    const revenue = parseFloat(asset.revenue24h.replace('$', '').replace(',', ''));
    return sum + revenue;
  }, 0) : 0;

  const overallHealth = totalAssets > 0 ? (activeAssets / totalAssets) * 100 : 0;

  const alertAssets = tabAssets.filter(asset => asset.alerts && asset.alerts.length > 0);

  const assetsByType = {
    gpu: filteredAssets.filter(a => a.type === 'gpu'),
    'real-estate': filteredAssets.filter(a => a.type === 'real-estate'),
    energy: filteredAssets.filter(a => a.type === 'energy'),
    financial: filteredAssets.filter(a => a.type === 'financial'),
  };

  return (
    <div className={`${isCollapsed ? 'ml-16' : 'ml-[280px]'} pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300`}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Assets Monitoring</h1>
          <p className="text-gray-400 mt-2">
            Real-time monitoring and performance metrics for all your assets
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-700/30">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-1 py-4 font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>
          {/* Tab Description */}
          <p className="text-gray-400 text-sm mt-2">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>

        {/* Alert Banner */}
        {alertAssets.length > 0 && (
          <div className="mb-6 p-4 bg-orange-900/20 border border-orange-800/30 rounded-lg">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-orange-300 font-medium">
                {alertAssets.length} asset{alertAssets.length > 1 ? 's' : ''} require{alertAssets.length === 1 ? 's' : ''} attention
              </span>
            </div>
          </div>
        )}

        {/* Overview Cards */}
        <div className={`grid grid-cols-1 ${activeTab === 'live' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6 mb-8`}>
          <div className="bg-[#3a3a3a] rounded-xl border border-gray-600 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Overall Health</p>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">{overallHealth.toFixed(0)}%</p>
          </div>
          <div className="bg-[#3a3a3a] rounded-xl border border-gray-600 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">{activeTab === 'live' ? 'Active Assets' : activeTab === 'progress' ? 'In Progress' : 'On Sale'}</p>
              <CheckCircleIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-white">{activeTab === 'live' ? `${activeAssets}/${totalAssets}` : totalAssets}</p>
          </div>
          <div className="bg-[#3a3a3a] rounded-xl border border-gray-600 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">{activeTab === 'progress' ? 'Avg Progress' : activeTab === 'presale' ? 'Avg Sales' : 'Avg Utilization'}</p>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {activeTab === 'progress' 
                ? `${Math.round(tabAssets.reduce((sum, a) => sum + (a.setupProgress || 0), 0) / Math.max(tabAssets.length, 1))}%`
                : activeTab === 'presale'
                ? `${Math.round(tabAssets.reduce((sum, a) => sum + (a.saleProgress || 0), 0) / Math.max(tabAssets.length, 1))}%`
                : `${avgUtilization.toFixed(0)}%`
              }
            </p>
          </div>
          {/* Only show 24h Revenue card for Live tab */}
          {activeTab === 'live' && (
            <div className="bg-[#3a3a3a] rounded-xl border border-gray-600 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">24h Revenue</p>
                <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-white">${total24hRevenue.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-[#3a3a3a] border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Asset Types</option>
            <option value="gpu">GPU Clusters</option>
            <option value="real-estate">Real Estate</option>
            <option value="energy">Energy Assets</option>
            <option value="financial">Financial Assets</option>
          </select>
          {activeTab === 'live' && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-[#3a3a3a] border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="degraded">Degraded</option>
              <option value="offline">Offline</option>
            </select>
          )}
        </div>

        {/* Asset Categories */}
        <div className="space-y-8">
          {Object.entries(assetsByType).map(([type, categoryAssets]) => {
            if (filterType !== 'all' && filterType !== type) return null;
            if (categoryAssets.length === 0) return null;

            const Icon = getIcon(type);
            const categoryName = type === 'real-estate' ? 'Real Estate' : 
                              type === 'gpu' ? 'GPU Clusters' :
                              type === 'energy' ? 'Energy Assets' : 'Financial Assets';

            return (
              <div key={type} className="bg-[#3a3a3a] rounded-xl border border-gray-600 p-6">
                <div className="flex items-center mb-6">
                  <Icon className="w-6 h-6 text-blue-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">{categoryName}</h2>
                  <span className="ml-2 text-sm text-gray-400">({categoryAssets.length})</span>
                </div>

                <div className="space-y-3">
                  {categoryAssets
                    .filter(asset => filterStatus === 'all' || asset.status === filterStatus)
                    .map((asset) => {
                      const StatusIcon = getStatusIcon(asset.status);
                      return (
                        <div key={asset.id} className="bg-gradient-to-r from-[#3a3a3a]/80 via-[#3a3a3a] to-[#3a3a3a]/80 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 group">
                          <div className="flex items-center justify-between">
                            {/* Left Side - Status & Info */}
                            <div className="flex items-center space-x-4">
                              <div className={`relative w-14 h-14 rounded-2xl ${getStatusColor(asset.status)} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                <StatusIcon className="w-7 h-7" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                              </div>
                              
                              <div className="min-w-0">
                                <h3 className="text-white font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors duration-300 truncate">
                                  {asset.name}
                                </h3>
                                <div className="flex items-center text-gray-400">
                                  <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                                  <span className="text-sm truncate">{asset.location}</span>
                                  <span className="mx-2">•</span>
                                  <span className="text-xs">{asset.lastUpdate}</span>
                                </div>
                              </div>
                            </div>

                            {/* Center - Progress or Metrics */}
                            <div className="flex items-center space-x-8">
                              {/* Progress for In Progress tab */}
                              {asset.setupProgress !== undefined && (
                                <div className="flex items-center space-x-4">
                                  <div className="text-center">
                                    <div className="text-sm text-gray-400 mb-1">Setup Progress</div>
                                    <div className="text-lg font-bold text-blue-400">{asset.setupProgress}%</div>
                                  </div>
                                  <div className="w-32 bg-gray-700/50 rounded-full h-3 shadow-inner">
                                    <div 
                                      className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 h-3 rounded-full shadow-sm transition-all duration-700 ease-out"
                                      style={{ width: `${asset.setupProgress}%` }}
                                    ></div>
                                  </div>
                                  {asset.estimatedCompletion && (
                                    <div className="text-xs text-gray-500 whitespace-nowrap">
                                      Est: {asset.estimatedCompletion}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Progress for Presale tab */}
                              {asset.saleProgress !== undefined && (
                                <div className="flex items-center space-x-4">
                                  <div className="text-center">
                                    <div className="text-sm text-gray-400 mb-1">Sale Progress</div>
                                    <div className="text-lg font-bold text-purple-400">{asset.saleProgress}%</div>
                                  </div>
                                  <div className="w-32 bg-gray-700/50 rounded-full h-3 shadow-inner">
                                    <div 
                                      className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 h-3 rounded-full shadow-sm transition-all duration-700 ease-out"
                                      style={{ width: `${asset.saleProgress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}

                              {/* Metrics for Live tab */}
                              {activeTab === 'live' && (
                                <div className="flex items-center space-x-6">
                                  <div className="text-center px-3 py-2 bg-black/20 rounded-xl border border-gray-700/30">
                                    <div className="text-xs text-gray-400 mb-1">Utilization</div>
                                    <div className="text-lg font-bold text-white">{asset.utilization}%</div>
                                  </div>
                                  
                                  {asset.temperature && (
                                    <div className="text-center px-3 py-2 bg-black/20 rounded-xl border border-gray-700/30">
                                      <div className="text-xs text-gray-400 mb-1">Temperature</div>
                                      <div className="text-lg font-bold text-orange-400">{asset.temperature}°C</div>
                                    </div>
                                  )}
                                  
                                  {asset.occupancy && (
                                    <div className="text-center px-3 py-2 bg-black/20 rounded-xl border border-gray-700/30">
                                      <div className="text-xs text-gray-400 mb-1">Occupancy</div>
                                      <div className="text-lg font-bold text-white">{asset.occupancy}%</div>
                                    </div>
                                  )}
                                  
                                  {asset.generation && (
                                    <div className="text-center px-3 py-2 bg-black/20 rounded-xl border border-gray-700/30">
                                      <div className="text-xs text-gray-400 mb-1">Generation</div>
                                      <div className="text-lg font-bold text-green-400">{asset.generation}MW</div>
                                    </div>
                                  )}
                                  
                                  <div className="text-center px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                                    <div className="text-xs text-gray-400 mb-1">24h Revenue</div>
                                    <div className="text-xl font-bold text-green-400">{asset.revenue24h}</div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Right Side - Status & Action */}
                            <div className="flex items-center space-x-4">
                              <div className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(asset.status)} border border-current/20`}>
                                {asset.status}
                              </div>
                              
                              {asset.status === 'preparation' && (
                                <button className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105">
                                  Monitor
                                </button>
                              )}
                              
                              {asset.status === 'presale' && (
                                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
                                  View Sale
                                </button>
                              )}
                              
                              {['active', 'maintenance', 'offline', 'degraded'].includes(asset.status) && (
                                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
                                  Details
                                </button>
                              )}
                            </div>
                          </div>
                          
                          {/* Alerts */}
                          {asset.alerts && asset.alerts.length > 0 && (
                            <div className="mt-4 p-3 bg-gradient-to-r from-orange-900/20 to-red-900/10 rounded-xl border border-orange-500/20">
                              <div className="space-y-2">
                                {asset.alerts.map((alert, idx) => (
                                  <div key={idx} className="flex items-start space-x-2">
                                    <ExclamationTriangleIcon className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-orange-300">
                                      {alert}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssetsMonitoring;