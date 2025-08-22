import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'GPU Compute', value: 35, color: '#0066FF' },
  { name: 'Real Estate', value: 25, color: '#00C896' },
  { name: 'Solar Energy', value: 20, color: '#FFA500' },
  { name: 'Data Centers', value: 15, color: '#8B5CF6' },
  { name: 'Others', value: 5, color: '#64748B' },
];

const AssetAllocation: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Asset Allocation</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }} 
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {value} ({entry.value}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Assets</span>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">42 oNFTs</span>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;