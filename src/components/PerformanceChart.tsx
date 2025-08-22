import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const tneData = [
  { name: 'Jan', value: 125000, growth: 0 },
  { name: 'Feb', value: 148000, growth: 18.4 },
  { name: 'Mar', value: 162000, growth: 9.5 },
  { name: 'Apr', value: 189000, growth: 16.7 },
  { name: 'May', value: 215000, growth: 13.8 },
  { name: 'Jun', value: 234000, growth: 8.8 },
  { name: 'Jul', value: 267000, growth: 14.1 },
  { name: 'Aug', value: 289000, growth: 8.2 },
  { name: 'Sep', value: 312000, growth: 8.0 },
  { name: 'Oct', value: 345000, growth: 10.6 },
  { name: 'Nov', value: 378000, growth: 9.6 },
  { name: 'Dec', value: 421000, growth: 11.4 },
];

const tvlData = [
  { name: 'Jan', value: 28500000, growth: 0 },
  { name: 'Feb', value: 31200000, growth: 9.5 },
  { name: 'Mar', value: 33800000, growth: 8.3 },
  { name: 'Apr', value: 36900000, growth: 9.2 },
  { name: 'May', value: 39100000, growth: 6.0 },
  { name: 'Jun', value: 41200000, growth: 5.4 },
  { name: 'Jul', value: 43800000, growth: 6.3 },
  { name: 'Aug', value: 45600000, growth: 4.1 },
  { name: 'Sep', value: 47200000, growth: 3.5 },
  { name: 'Oct', value: 48900000, growth: 3.6 },
  { name: 'Nov', value: 50100000, growth: 2.5 },
  { name: 'Dec', value: 52300000, growth: 4.4 },
];

const PerformanceChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 12 months');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeChart, setActiveChart] = useState<'TNE' | 'TVL'>('TNE');
  
  const periods = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 6 months', 'Last 12 months', 'All time'];
  
  const currentData = activeChart === 'TNE' ? tneData : tvlData;
  const currentValue = currentData[currentData.length - 1].value;
  const previousValue = currentData[0].value;
  const totalGrowth = ((currentValue - previousValue) / previousValue) * 100;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${payload[0].value.toLocaleString()}
          </p>
          <p className={`text-sm font-semibold ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}% vs prev month
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
            <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Network Performance</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeChart === 'TNE' ? 'Total network earnings growth over time' : 'Total value locked in the protocol'}
            </p>
          </div>
        </div>
        
        {/* Modern Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-200"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{selectedPeriod}</span>
            <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-10 overflow-hidden">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedPeriod === period 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
          <button
            onClick={() => setActiveChart('TNE')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeChart === 'TNE'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            TNE
          </button>
          <button
            onClick={() => setActiveChart('TVL')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeChart === 'TVL'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            TVL
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Current {activeChart}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ${activeChart === 'TVL' ? (currentValue / 1000000).toFixed(1) + 'M' : currentValue.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Growth</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">+{totalGrowth.toFixed(1)}%</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Monthly Avg</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">+8.2%</p>
        </div>
      </div>
      
      {/* Modern Area Chart */}
      <div className="h-80 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="25%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="50%" stopColor="#10B981" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="2 4" 
              stroke="#E5E7EB" 
              strokeOpacity={0.3}
              horizontal={true}
              vertical={false}
            />
            
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              fontSize={12}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => 
                activeChart === 'TVL' 
                  ? `$${(value / 1000000).toFixed(0)}M` 
                  : `$${(value / 1000).toFixed(0)}K`
              }
              dx={-10}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="url(#strokeGradient)"
              strokeWidth={3}
              fill="url(#portfolioGradient)"
              dot={{ fill: '#10B981', stroke: '#ffffff', strokeWidth: 3, r: 5 }}
              activeDot={{ 
                r: 8, 
                fill: '#10B981', 
                stroke: '#ffffff', 
                strokeWidth: 4,
                filter: 'drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3))'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Performance Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Best Month</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">April</p>
          <p className="text-xs text-green-600 dark:text-green-400 font-medium">+21.7%</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Worst Month</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">March</p>
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">-4.2%</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Avg Monthly</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">+8.2%</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Consistent</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Volatility</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">Low</p>
          <p className="text-xs text-green-600 dark:text-green-400 font-medium">4.2%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;