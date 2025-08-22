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
} from '@heroicons/react/24/outline';

interface Asset {
  id: number;
  name: string;
  type: 'gpu' | 'real-estate' | 'energy' | 'financial';
  location: string;
  status: 'active' | 'maintenance' | 'offline' | 'degraded';
  utilization: number;
  revenue24h: string;
  temperature?: number;
  occupancy?: number;
  generation?: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
  alerts?: string[];
}

const assets: Asset[] = [
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
  {
    id: 6,
    name: 'Wind Farm #15',
    type: 'energy',
    location: 'Texas Plains',
    status: 'active',
    utilization: 76,
    revenue24h: '$620.45',
    generation: 3.2,
    trend: 'stable',
    lastUpdate: '3 min ago',
  },
  {
    id: 7,
    name: 'Treasury Bonds Portfolio',
    type: 'financial',
    location: 'Global',
    status: 'active',
    utilization: 100,
    revenue24h: '$125.80',
    trend: 'stable',
    lastUpdate: '1 hour ago',
  },
];

const AssetsMonitoring: React.FC = () => {
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

  const filteredAssets = assets.filter(asset => {
    const typeMatch = filterType === 'all' || asset.type === filterType;
    const statusMatch = filterStatus === 'all' || asset.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const totalAssets = assets.length;
  const activeAssets = assets.filter(a => a.status === 'active').length;
  const avgUtilization = assets.reduce((sum, a) => sum + a.utilization, 0) / assets.length;
  const total24hRevenue = assets.reduce((sum, asset) => {
    const revenue = parseFloat(asset.revenue24h.replace('$', '').replace(',', ''));
    return sum + revenue;
  }, 0);

  const overallHealth = (activeAssets / totalAssets) * 100;

  const alertAssets = assets.filter(asset => asset.alerts && asset.alerts.length > 0);

  const assetsByType = {
    gpu: assets.filter(a => a.type === 'gpu'),
    'real-estate': assets.filter(a => a.type === 'real-estate'),
    energy: assets.filter(a => a.type === 'energy'),
    financial: assets.filter(a => a.type === 'financial'),
  };

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assets Monitoring</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time monitoring and performance metrics for all your assets
          </p>
        </div>

        {/* Alert Banner */}
        {alertAssets.length > 0 && (
          <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-orange-700 dark:text-orange-300 font-medium">
                {alertAssets.length} asset{alertAssets.length > 1 ? 's' : ''} require{alertAssets.length === 1 ? 's' : ''} attention
              </span>
            </div>
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Overall Health</p>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{overallHealth.toFixed(0)}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Assets</p>
              <CheckCircleIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeAssets}/{totalAssets}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Utilization</p>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgUtilization.toFixed(0)}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">24h Revenue</p>
              <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${total24hRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
          >
            <option value="all">All Asset Types</option>
            <option value="gpu">GPU Clusters</option>
            <option value="real-estate">Real Estate</option>
            <option value="energy">Energy Assets</option>
            <option value="financial">Financial Assets</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="degraded">Degraded</option>
            <option value="offline">Offline</option>
          </select>
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
              <div key={type} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-6">
                  <Icon className="w-6 h-6 text-edith-primary mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{categoryName}</h2>
                  <span className="ml-2 text-sm text-gray-500">({categoryAssets.length})</span>
                </div>

                <div className="space-y-4">
                  {categoryAssets
                    .filter(asset => filterStatus === 'all' || asset.status === filterStatus)
                    .map((asset) => {
                      const StatusIcon = getStatusIcon(asset.status);
                      return (
                        <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${getStatusColor(asset.status)}`}>
                              <StatusIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{asset.name}</h3>
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                {asset.location}
                                <span className="mx-2">•</span>
                                <span>Updated {asset.lastUpdate}</span>
                              </div>
                              {asset.alerts && asset.alerts.length > 0 && (
                                <div className="mt-1">
                                  {asset.alerts.map((alert, idx) => (
                                    <p key={idx} className="text-xs text-orange-600 dark:text-orange-400">
                                      ⚠️ {alert}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            {/* Utilization */}
                            <div className="text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">Utilization</p>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">{asset.utilization}%</p>
                            </div>

                            {/* Type-specific metrics */}
                            {asset.temperature && (
                              <div className="text-center">
                                <p className="text-xs text-gray-600 dark:text-gray-400">Temp</p>
                                <div className="flex items-center">
                                  <FireIcon className="w-4 h-4 text-orange-500 mr-1" />
                                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{asset.temperature}°C</p>
                                </div>
                              </div>
                            )}

                            {asset.occupancy && (
                              <div className="text-center">
                                <p className="text-xs text-gray-600 dark:text-gray-400">Occupancy</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{asset.occupancy}%</p>
                              </div>
                            )}

                            {asset.generation && (
                              <div className="text-center">
                                <p className="text-xs text-gray-600 dark:text-gray-400">Generation</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{asset.generation}MW</p>
                              </div>
                            )}

                            {/* Revenue */}
                            <div className="text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">24h Revenue</p>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">{asset.revenue24h}</p>
                            </div>

                            {/* Trend */}
                            <div className="text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">Trend</p>
                              <p className="text-lg">{getTrendIcon(asset.trend)}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-edith-primary text-white rounded text-sm hover:bg-edith-primary/90 transition-colors">
                                Details
                              </button>
                              {asset.status === 'degraded' && (
                                <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors">
                                  Schedule
                                </button>
                              )}
                            </div>
                          </div>
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