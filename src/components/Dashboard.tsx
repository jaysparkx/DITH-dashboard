import React, { useState } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
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
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  BanknotesIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('main');
  const { isCollapsed } = useSidebar();

  const tabs = [
    { id: 'main', name: 'Main', icon: HomeIcon },
    { id: 'investors', name: 'Investors', icon: UsersIcon },
    { id: 'yield', name: 'Yield & Staking', icon: BanknotesIcon },
    { id: 'transactions', name: 'Transactions', icon: ClockIcon },
  ];

  return (
    <div className={`${isCollapsed ? 'ml-16' : 'ml-[280px]'} pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300`}>
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Protocol Analytics</h1>
              <p className="text-gray-400 mt-2">
                Comprehensive insights and analytics for the EDITH ecosystem
              </p>
            </div>
            <button
              onClick={() => setShowHealthModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-900/30 hover:bg-green-900/50 text-green-400 rounded-xl transition-colors duration-200"
            >
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Network Health</span>
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
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
        </div>

        {/* Tab Content */}
        {activeTab === 'main' && (
          <>
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
              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Daily Network Earnings</h3>
                  <div className="p-2 bg-green-900/30 rounded-lg">
                    <ChartBarIcon className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">$8,450</p>
                <p className="text-sm text-green-400 font-medium">+15.3% vs yesterday</p>
              </div>
              
              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Monthly Network Earnings</h3>
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <CurrencyDollarIcon className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">$235K</p>
                <p className="text-sm text-blue-400 font-medium">+28.7% vs last month</p>
              </div>

              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Active Network Users</h3>
                  <div className="p-2 bg-purple-900/30 rounded-lg">
                    <CpuChipIcon className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">12,847</p>
                <p className="text-sm text-purple-400 font-medium">+5.2% new users</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Daily Active</p>
                    <p className="font-semibold text-white">3,421</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Transactions</p>
                    <p className="font-semibold text-white">8,956</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Allocation and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AssetAllocation />
              <ActivityFeed />
            </div>
          </>
        )}

        {activeTab === 'investors' && (
          <div className="space-y-8">
            {/* Investor Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Investors"
                value="2,847"
                change={12.3}
                trend="up"
                icon={UsersIcon}
              />
              <StatCard
                title="Total Investment Value"
                value="$18.2M"
                change={24.7}
                trend="up"
                icon={CurrencyDollarIcon}
              />
              <StatCard
                title="Average Investment"
                value="$6,392"
                change={8.1}
                trend="up"
                icon={ChartBarIcon}
              />
              <StatCard
                title="Active Investors (30d)"
                value="1,923"
                change={15.8}
                trend="up"
                icon={ShieldCheckIcon}
              />
            </div>

            {/* Investor Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Investor Asset Distribution</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Real Estate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm text-white font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">GPU Assets</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm text-white font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Other Assets</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm text-white font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Top Investor Segments</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Institutional Investors</p>
                      <p className="text-sm text-gray-400">Large scale investments</p>
                    </div>
                    <span className="text-xl font-bold text-blue-400">42%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Retail Investors</p>
                      <p className="text-sm text-gray-400">Individual investors</p>
                    </div>
                    <span className="text-xl font-bold text-green-400">35%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Accredited Investors</p>
                      <p className="text-sm text-gray-400">High net worth</p>
                    </div>
                    <span className="text-xl font-bold text-purple-400">23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'yield' && (
          <div className="space-y-8">
            {/* Yield & Staking Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Staked Value"
                value="$28.5M"
                change={19.2}
                trend="up"
                icon={BanknotesIcon}
              />
              <StatCard
                title="Average APY"
                value="12.4%"
                change={2.1}
                trend="up"
                icon={ChartBarIcon}
              />
              <StatCard
                title="Total Rewards Paid"
                value="$1.8M"
                change={31.5}
                trend="up"
                icon={CurrencyDollarIcon}
              />
              <StatCard
                title="Active Stakers"
                value="1,547"
                change={18.9}
                trend="up"
                icon={UsersIcon}
              />
            </div>

            {/* Yield Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Staking Pools Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">RWA Staking Pool</p>
                      <p className="text-sm text-gray-400">$12.3M staked</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">14.2% APY</p>
                      <p className="text-sm text-gray-400">+2.1% this month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">GPU Mining Pool</p>
                      <p className="text-sm text-gray-400">$8.7M staked</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-400">11.8% APY</p>
                      <p className="text-sm text-gray-400">+1.5% this month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Liquidity Pool</p>
                      <p className="text-sm text-gray-400">$7.5M staked</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-400">9.6% APY</p>
                      <p className="text-sm text-gray-400">+0.8% this month</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Rewards Distribution</h3>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-700/30">
                    <p className="text-2xl font-bold text-white mb-2">$847,320</p>
                    <p className="text-green-400 text-sm font-medium">Total rewards this month</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Daily Rewards</span>
                      <span className="text-white font-semibold">$28,244</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Weekly Rewards</span>
                      <span className="text-white font-semibold">$197,708</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pending Claims</span>
                      <span className="text-yellow-400 font-semibold">$45,890</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-8">
            {/* Transaction Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Transactions"
                value="847,392"
                change={22.4}
                trend="up"
                icon={ClockIcon}
              />
              <StatCard
                title="Transaction Volume"
                value="$156.8M"
                change={18.7}
                trend="up"
                icon={CurrencyDollarIcon}
              />
              <StatCard
                title="Average Transaction"
                value="$185.12"
                change={-3.2}
                trend="down"
                icon={ChartBarIcon}
              />
              <StatCard
                title="Success Rate"
                value="99.2%"
                change={0.8}
                trend="up"
                icon={ShieldCheckIcon}
              />
            </div>

            {/* Transaction Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Transaction Types</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Asset Purchases</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm text-white font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Staking Rewards</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      <span className="text-sm text-white font-medium">28%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Asset Transfers</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                      <span className="text-sm text-white font-medium">18%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Other</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                      </div>
                      <span className="text-sm text-white font-medium">9%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#3a3a3a] rounded-xl shadow-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Recent Large Transactions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">RWA Asset Purchase</p>
                      <p className="text-sm text-gray-400">2 hours ago</p>
                    </div>
                    <span className="text-green-400 font-semibold">+$45,720</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">GPU Mining Reward</p>
                      <p className="text-sm text-gray-400">4 hours ago</p>
                    </div>
                    <span className="text-blue-400 font-semibold">+$28,340</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Asset Transfer</p>
                      <p className="text-sm text-gray-400">6 hours ago</p>
                    </div>
                    <span className="text-purple-400 font-semibold">$67,890</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Staking Deposit</p>
                      <p className="text-sm text-gray-400">8 hours ago</p>
                    </div>
                    <span className="text-yellow-400 font-semibold">+$35,560</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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