import React, { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import ActionCard from './ActionCard';
import StatCard from './StatCard';
import ActivityFeed from './ActivityFeed';
import AssetAllocation from './AssetAllocation';
import PerformanceChart from './PerformanceChart';
import { 
  CurrencyDollarIcon,
  ChartBarIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  HeartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [showHealthModal, setShowHealthModal] = useState(false);

  return (
    <div className="ml-64 pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EDITH Network Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Real-time network performance and infrastructure metrics for Web3 RWA ecosystem
              </p>
            </div>
            <button
              onClick={() => setShowHealthModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-xl transition-colors duration-200"
            >
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Network Health</span>
            </button>
          </div>
        </div>

        {/* Network Performance Chart - Primary Position */}
        <div className="mb-8">
          <PerformanceChart />
        </div>

        {/* Network Earnings & TVL Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Network Earnings (TNE)"
            value="$2.4M"
            change={18.7}
            trend="up"
            icon={CurrencyDollarIcon}
          />
          <StatCard
            title="Today's Network Earnings"
            value="$8,450"
            change={15.3}
            trend="up"
            icon={ChartBarIcon}
          />
          <StatCard
            title="Total Value Locked (TVL)"
            value="$45.2M"
            change={8.9}
            trend="up"
            icon={CpuChipIcon}
          />
          <StatCard
            title="% Change Over Past Month"
            value="+22.4%"
            change={22.4}
            trend="up"
            icon={ShieldCheckIcon}
          />
        </div>

        {/* Additional Network Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Network Earnings</h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ChartBarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$8,450</p>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">+15.3% vs yesterday</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Network Earnings</h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CurrencyDollarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$235K</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">+28.7% vs last month</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Network Users</h3>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <CpuChipIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12,847</p>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">+5.2% new users</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Daily Active</p>
                <p className="font-semibold text-gray-900 dark:text-white">3,421</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Transactions</p>
                <p className="font-semibold text-gray-900 dark:text-white">8,956</p>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Allocation and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssetAllocation />
          <ActivityFeed />
        </div>

        {/* Network Health Modal */}
        {showHealthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <HeartIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Network Health Status</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Real-time infrastructure monitoring</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHealthModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Overall Health Score */}
                <div className="text-center mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                    <span className="text-3xl font-bold text-white">98.6%</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Excellent Network Health</h4>
                  <p className="text-gray-600 dark:text-gray-400">All systems operating within optimal parameters</p>
                </div>

                {/* Network Health Indicators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                    <ProgressIndicator title="Network Uptime" value={99.8} color="green" />
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</p>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">99.97% availability</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                    <ProgressIndicator title="Asset Utilization" value={87.5} color="blue" />
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Current capacity</p>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">87.5% utilized</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                    <ProgressIndicator title="Transaction Success" value={98.2} color="green" />
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Success rate</p>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">98.2% success</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                    <ProgressIndicator title="Network Security" value={99.9} color="blue" />
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Security score</p>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">99.9% secure</p>
                    </div>
                  </div>
                </div>

                {/* Additional Health Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Response Times</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">API Response</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">156ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Transaction Processing</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">2.3s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Block Confirmation</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">5.1s</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Network Load</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                        <span className="font-semibold text-yellow-600 dark:text-yellow-400">67%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bandwidth</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">78%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Security Status</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Threat Level</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">Low</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active Monitoring</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">24/7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last Audit</span>
                        <span className="font-semibold text-gray-600 dark:text-gray-400">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowHealthModal(false)}
                    className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;